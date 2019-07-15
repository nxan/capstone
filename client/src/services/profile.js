import axios from "axios";
import { notification } from 'antd'

// eslint-disable-next-line import/prefer-default-export
export async function edit(name, password, email) {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ name, password, email });
    return axios.put('http://localhost:8888/api/user', body, config)
        .then((result) => {
            return result.data
        })
        .catch(() => {
            notification.warning({
                message: "Login Failed",
                description: "Invalid email or password",
            })
        })

}