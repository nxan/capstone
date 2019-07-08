import axios from "axios";

// eslint-disable-next-line camelcase
export async function getSession(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/session/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getVisitor(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/visitors/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

