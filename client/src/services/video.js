import axios from "axios";

// eslint-disable-next-line camelcase
/* eslint-disable import/prefer-default-export */
export async function getVideo() {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/video`
    return axios.get(url)
        .then((result) => {
            return result.data
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}
// eslint-disable-next-line camelcase
export async function getHeatMap(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/page/getAll/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}