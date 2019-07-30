const express = require('express');
const router = express.Router();
const session_db = require('../../db/session_db')
const session_page_db = require('../../db/session_page_db')
const Session_page = require('../../model/Session_page')
const Sequelize = require('sequelize');
const db = require('../../config/db');
const Op = Sequelize.Op
router.get('/:id', async (req, res) => {
   try {
      const id = req.params.id
      sessions = await session_db.getAllSessionsByCondition({ shop_id: id })
      let session_array = []
      sessions.forEach(element => {
         session_array.push(element.id)
      });
      //  let getAll = await Session_page.findAll({
      //    where:{
      //       session_id:{
      //          [Op.in]: session_array
      //       }
      //    }
      //  })
      let first_page = null
      await db.query('select page_id, count(*) as num from session_page where page_order = 1 GROUP by page_id ORDER by num desc', { type: Sequelize.QueryTypes.SELECT })
         .then(result => {
            first_page = result
         })
      let all_session_page = null
      await db.query('select A.session_id, A.page_order as page_order_from, A.page_id as page_id_from, B.page_order as page_order_to, B.page_id as page_id_to from session_page A, session_page B where A.session_id = B.session_id and A.page_order + 1 = B.page_order and A.session_id in (:list_session)',
         { replacements: { list_session: session_array }, type: db.QueryTypes.SELECT }
      ).then(ssp => {
         all_session_page = ssp
      })

      first_page.forEach(first => {
         let children = []
         let queue = []
         all_session_page.forEach(element => {
            if (element.page_order_from == 1 && element.page_id_from == first.page_id) {
               let index = children.findIndex(obj => obj.page_id == element.page_id_to)
               if (index < 0) {
                  let sesion_list = []
                  sesion_list.push(element.session_id)
                  children.push({ "page_id": element.page_id_to, "page_order": element.page_order_to, "num": 1, "sesion": sesion_list })
               } else {
                  children[index].num++
                  children[index].sesion.push(element.session_id)
               }
            }
         });
         first.children = children
         first.end_session = first.num-children.length
         first.children.forEach(element => {
            queue.push(element)
         });
         while (queue.length > 0) {
            let z = queue.pop()
            let a = []
            all_session_page.forEach(element => {
               if (element.page_order_from == z.page_order && element.page_id_from == z.page_id && z.sesion.includes(element.session_id)) {
                  let index = a.findIndex(obj => obj.page_id == element.page_id_to)
                  if (index < 0) {
                     let sesion_list = []
                     sesion_list.push(element.session_id)
                     a.push({ "page_id": element.page_id_to, "page_order": element.page_order_to, "num": 1, "sesion": sesion_list })
                  } else {
                     a[index].num++
                     a[index].sesion.push(element.session_id)
                  }
               }
            });
            z.end_session = z.num-a.length
            z.children = a
            z.children.forEach(element => {
               queue.push(element)
            });
         }
      })

      res.json(first_page)
   } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
   }
})
module.exports = router