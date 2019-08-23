import axios from "axios";
import { notification } from 'antd'

export async function login(email, password, shop, hmac, code, stateShop, installed) {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const state = stateShop
  console.log(shop)
  console.log(code)
  console.log(stateShop)
  console.log(installed)
  const body = JSON.stringify({ email, password });
  
  return axios.post('https://e2161bef.ngrok.io/api/auth', body, config)
    .then((result) => {
      if (installed) {        
        const url = "https://e2161bef.ngrok.io/api/shopify/addScript"
        axios.get(url, {
          params: {
            shop, hmac, code, state
          }
        })        
      }      
      return result.data      
    }).catch(() => {
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
  const state = stateShop
  const body = JSON.stringify({ email, password, shopName, name, shop });
  return axios.post('https://e2161bef.ngrok.io/api/user', body, config)
    .then(() => {
      const url = "https://e2161bef.ngrok.io/api/shopify/addScript"
      return axios.get(url, {
        params: {
          shop, hmac, code, state
        }
      }).then((result) => {
        return result
      }).catch(() => {
        notification.warning({
          message: "Register Failed",
        })
      })
    })
    .catch(() => {
      notification.warning({
        message: "Register Failed",
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
    return axios.get('https://e2161bef.ngrok.io/api/shop/me')
      .then((result) => {
        return result.data
      })
  }
  return false;
}

export async function logout() {
  localStorage.removeItem('token');
}