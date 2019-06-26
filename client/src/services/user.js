import axios from "axios";
import { notification } from 'antd'

export async function login(email, password) {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password });
  return axios.post('https://capstone-shopify.herokuapp.com/api/auth', body, config)
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

export async function loadProfile() {
  const setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  }
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    return axios.get('https://capstone-shopify.herokuapp.com/api/shop/me')
      .then((result) => {
        return result.data
      })
  }
  return false;
}

export async function logout() {
  localStorage.removeItem('token');
}