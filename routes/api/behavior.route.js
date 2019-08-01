const express = require('express');
const router = express.Router();
const session_db = require('../../db/session_db')
const page_db = require('../../db/page_db')
const shop_db = require('../../db/shop_db')
const Sequelize = require('sequelize');
const db = require('../../config/db');
const Op = Sequelize.Op
router.get('/:url', async (req, res) => {
   try {
      const url = req.params.url
      let shop = await shop_db.getShop(url)
      let id = shop.id
      sessions = await session_db.getAllSessionsByCondition({ shop_id: id })
      let session_array = []
      let keys = []
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
      let stm = "SELECT p.page_url, sp.page_id, sp.num from(" +
         "select page_id, count(*) as num from session_page where page_order = 1 GROUP by page_id" +
         ") sp INNER JOIN dbo.page p on (sp.page_id = p.id and p.shop_id=:shop_id) ORDER by num desc"
      await db.query(stm, { replacements: { shop_id: id } , type: Sequelize.QueryTypes.SELECT })
         .then(result => {
            first_page = result
         })
      let all_session_page = null
      let stm2 = "SELECT sp.session_id,p1.page_url as page_url_from,sp.page_order_from,sp.page_id_from,p2.page_url as page_url_to,sp.page_order_to,sp.page_id_to FROM" +
         "(select A.session_id, A.page_order as page_order_from, A.page_id as page_id_from, B.page_order as page_order_to, B.page_id as page_id_to from session_page A, session_page B where A.session_id = B.session_id and A.page_order + 1 = B.page_order and A.session_id in (:list_session)) sp " +
         "INNER JOIN dbo.page p1 on (sp.page_id_from = p1.id) INNER JOIN dbo.page p2 on(sp.page_id_to = p2.id)"
      await db.query(stm2,
         { replacements: { list_session: session_array }, type: db.QueryTypes.SELECT }
      ).then(ssp => {
         all_session_page = ssp
      })

      first_page.forEach(first => {
         let children = []
         let queue = []
         let keyFirst = keys.length + 1
         keys.push(keyFirst)
         first.key = "beha" + keyFirst
         all_session_page.forEach(element => {
            if (element.page_order_from == 1 && element.page_id_from == first.page_id) {
               let index = children.findIndex(obj => obj.page_id == element.page_id_to)
               if (index < 0) {
                  let sesion_list = []
                  sesion_list.push(element.session_id)
                  let key = keys.length + 1
                  keys.push(key)
                  children.push({ "key": "beha" + key, "page_id": element.page_id_to, "page_url": element.page_url_to, "page_order": element.page_order_to, "num": 1, "sesion": sesion_list })
               } else {
                  children[index].num++
                  children[index].sesion.push(element.session_id)
               }
            }
         });
         let continueFlow = 0
         if (children.length > 0) {
            first.children = children
            first.children.forEach(element => {
               continueFlow += element.num
               queue.push(element)
            });
         }
         first.end_session = first.num - continueFlow
         while (queue.length > 0) {
            let z = queue.pop()
            let a = []
            all_session_page.forEach(element => {
               if (element.page_order_from == z.page_order && element.page_id_from == z.page_id && z.sesion.includes(element.session_id)) {
                  let index = a.findIndex(obj => obj.page_id == element.page_id_to)
                  if (index < 0) {
                     let sesion_list = []
                     let key = keys.length + 1
                     keys.push(key)
                     sesion_list.push(element.session_id)
                     a.push({ "key": "beha" + key, "page_id": element.page_id_to, "page_url": element.page_url_to, "page_order": element.page_order_to, "num": 1, "sesion": sesion_list })
                  } else {
                     a[index].num++
                     a[index].sesion.push(element.session_id)
                  }
               }
            });
            let continueFlow = 0
            if (a.length > 0) {
               z.children = a
               z.children.forEach(element => {
                  continueFlow += element.num
                  queue.push(element)
               })
            }
            z.end_session = z.num - continueFlow
         }
      })

      res.json(first_page)
   } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
   }
})
router.get('/most_page/:url', async (req, res) => {
   try {
      const url = req.params.url
      let shop = await shop_db.getShop(url)
      let id = shop.id
      sessions = await session_db.getAllSessionsByCondition({ shop_id: id })
      let stm = "select sp.page_id, p.page_url, num from(select page_id, count(*) as num from session_page sp group by page_id) sp INNER JOIN dbo.page p on (sp.page_id = p.id and p.shop_id=:shop_id) where p.page_url like '" + url + "/products%' ORDER by num desc"
      let list_page = null
      await db.query(stm, { replacements: { shop_id: id }, type: Sequelize.QueryTypes.SELECT })
         .then(result => {
            console.log()
            list_page = result
         })
      let total = 0
      list_page.forEach(element=>{
         total+=element.num
         element.key = total
      })
      let totalRate = 0
      list_page.forEach((element,index)=>{         
         let r = element.num*100/total                
         let rate = Math.round(r*100)/100         
         if(index == list_page.length-1){
            rate = (100*100- totalRate*100)/100         
         }
         totalRate += rate
         element.rate = rate         
      })
      res.json(list_page)
   } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
   }
})
module.exports = router