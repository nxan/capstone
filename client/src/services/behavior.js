import axios from "axios";

// eslint-disable-next-line import/prefer-default-export
export async function getBehavior(shopUrl) {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const url = `http://localhost:8888/api/behavior/${shopUrl}`
    return axios.get(url, config)
        .then((result) => {
            return result.data
        })
}

export async function getMostProduct(shopUrl) {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const url = `http://localhost:8888/api/behavior/most_page/${shopUrl}`
    return axios.get(url, config)
        .then((result) => {
            return result.data
        })
}
