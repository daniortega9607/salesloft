import Vue from 'vue';
import axios from 'axios';

const { host, origin } = document.location;
const api = host.includes('localhost') ? 'http://localhost:3030' : origin;

axios.defaults.baseURL = api;
axios.interceptors.response.use(({ data }) => ({ data, error: null }), (error) => Promise.resolve({ error, data: null }));

Vue.prototype.$axios = axios;
