import merge from 'lodash/merge'
import Cookies from 'universal-cookie';
import { configureRefreshFetch, fetchJSON } from 'refresh-fetch'

const COOKIE_NAME = 'token'

const cookies = new Cookies();

const retrieveToken = () => cookies.get(COOKIE_NAME)
const saveToken = token => cookies.set(COOKIE_NAME, token)
const clearToken = () => cookies.remove(COOKIE_NAME)

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
  return fetchJSON('http://localhost:8080/users/signin', {
    method: 'POST',
    credentials: "include",
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(response => {
      saveToken(response.body)
    })
}


const shouldRefreshToken = error =>
  error.response.status === 401

const refreshToken = () => {
  return fetchJSONWithToken('http://localhost:8080/users/refresh', {
    method: 'GET',
    credentials: "include"
  })
    .then(response => {
      saveToken(response.body)
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
  clearToken
}