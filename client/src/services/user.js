import axios from "axios";
import { notification } from 'antd'

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

// eslint-disable-next-line camelcase
export async function register(email, password, shopName, name, shop, hmac, code, stateShop) {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password, shopName, name, shop });
  console.log(body);
  return axios.post('http://localhost:8888/api/user', body, config)
    .then((result) => {
      addScript(shop, hmac, code, stateShop)
      return result
    })
    .catch((errors) => {
      const error = errors.response;
      notification.warning({
        message: "Register Failed",
        description: error.msg,
      })
    })

}

function addScript(shop, hmac, code, state) {
  const url = "https://kieng.pagekite.me/api/shopify/addScript"
  return axios.get(url, {
    params: {
      shop, hmac, code, state
    }
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
      })
  }
  return false;
}

export async function logout() {
  localStorage.removeItem('token');
}