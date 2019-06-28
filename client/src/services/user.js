import axios from "axios";
import { notification } from 'antd'

export async function register(email, password) {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password });
  console.log(body);
  return axios.post('http://localhost:5000/api/user', body, config)
    .then((result) => {
      return result.data
    })
    .catch((errors) => {
      const error = errors.response;
      console.log(error);
      notification.warning({
        message: "Login Failed",
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
  return axios.post('http://localhost:5000/api/auth', body, config)
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
    return axios.get('http://localhost:5000/api/shop/me')
      .then((result) => {
        return result.data
      }).catch((errors) => {
        const error = errors.response;
        console.log(error);
      })
  }
  return false;
}

export async function logout() {
  localStorage.removeItem('token');
}