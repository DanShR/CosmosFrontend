import merge from 'lodash/merge'
import Cookies from 'universal-cookie';
import { configureRefreshFetch, fetchJSON } from 'refresh-fetch'

const COOKIE_NAME = 'token'

const cookies = new Cookies();

const retrieveToken = () => cookies.get(COOKIE_NAME)
const saveToken = token => cookies.set(COOKIE_NAME, token)
const clearToken = () => cookies.remove(COOKIE_NAME)
const API_URL = process.env.REACT_APP_API_URL

const fetchJSONWithToken = (url, options = {}) => {
  const token = retrieveToken()

  let optionsWithToken = options
  if (token != null) {
    optionsWithToken = merge({}, options, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  return fetchJSON(url, optionsWithToken)
}

const login = (username, password) => {
  return fetchJSON(API_URL + '/users/signin', {
    method: 'POST',
    credentials: "include",
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(response => {
      saveToken(response.body.accessToken)
    })
}


const shouldRefreshToken = (error) => {
  console.log(error.response);
  return false
  // error.response.status === 401
}

const refreshToken = () => {
  return fetchJSONWithToken(API_URL + '/users/refresh', {
    method: 'GET',
    credentials: "include"
  })
    .then(response => {
      saveToken(response.body.accessToken)
    })
    .catch(error => {
      // Clear token and continue with the Promise catch chain
      clearToken()
      throw error
    })
}

const fetch = configureRefreshFetch({
  fetch: fetchJSONWithToken,
  shouldRefreshToken,
  refreshToken
})

export {
  fetch,
  login,
  clearToken,
  API_URL
}