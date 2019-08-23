import axios from "axios";

// eslint-disable-next-line import/prefer-default-export
export async function getHours(shopUrl) {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const url = `http://localhost:8888/api/stats/timeaccess/${shopUrl}`
    return axios.get(url, config)
        .then((result) => {
            return result.data
        })
}

