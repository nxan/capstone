import axios from "axios";

// eslint-disable-next-line import/prefer-default-export
export async function getBehavior(shopUrl) {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const url = `http://localhost:8888/api/behavior/${shopUrl}`
    console.log(shopUrl)
    return axios.get(url, config)
        .then((result) => {
            return result.data
        })
}
