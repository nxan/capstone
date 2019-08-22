import axios from "axios";


/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line camelcase
export async function getVideo(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/video/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}