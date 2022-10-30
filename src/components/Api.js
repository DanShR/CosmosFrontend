import axios from 'axios';
import Cookies from 'universal-cookie';

const COOKIE_NAME = 'token'

const cookies = new Cookies();

const retrieveToken = () => cookies.get(COOKIE_NAME)
const saveToken = token => cookies.set(COOKIE_NAME, token)
const clearToken = () => cookies.remove(COOKIE_NAME)

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

instance.interceptors.request.use(
  (config) => {
    const token = retrieveToken();
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await refreshToken();
          const { accessToken } = rs.data;
          saveToken(accessToken);
          instance.defaults.headers.common["Authorization"] = 'Bearer ' + accessToken;
          return instance(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);

function refreshToken() {
  return instance.get('/users/refresh', {
    credentials: "include"
  });
}

const login = async (username, password) => {
  const res = await instance.post('/users/signin', { username, password });
  saveToken(res.data.accessToken)
}

const loadUserPosts = async () => {
  const res = await instance.get('/posts/');
  return res.data;
}

const addNewPost = async (postData) => {
  const res = await instance.post('/posts/newpost', postData);
  return res.data;
}

const deletePost = async (id) => {
  const res = await instance.delete('/posts/deletePost?id=' + id);
  return res;
}

const updatePost = async (id, text) => {
  const res = await instance.put('/posts/updatepost?id=' + id, { text });
  return res.data;
}

const loadAboutMe = async () => {
  const res = await instance.get('/users/me');
  return res.data;
}

const logout = async () => {
  await instance.get('/users/signout');
  clearToken();
}

export {
  login,
  loadUserPosts,
  addNewPost,
  deletePost,
  updatePost,
  loadAboutMe,
  logout
}