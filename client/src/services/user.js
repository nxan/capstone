import axios from "axios";
import { notification } from 'antd'

// eslint-disable-next-line camelcase
export async function register(email, password, shop_url) {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password, shop_url });
  console.log(body);
  return axios.post('http://localhost:8888/api/user', body, config)
    .then((result) => {
      return result.data
    })
    .catch((errors) => {
      const error = errors.response;
      notification.warning({
        message: "Register Failed",
        description: error.msg,
      })
    })

}

export async function login(email, password) {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password });
  return axios.post('http://localhost:8888/api/auth', body, config)
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
    return axios.get('http://localhost:8888/api/shop/me')
      .then((result) => {
        return result.data
      }).catch((err) => {
        console.log(err.response.statusText)
      })
  }
  return false;
}

export async function logout() {
  localStorage.removeItem('token');
}