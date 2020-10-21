const axios = require('axios');

exports.salesloft = (app) => {
  const token = app.get('salesloftKey');

  const client = axios.create({
    baseURL: 'https://api.salesloft.com',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  client.interceptors.response.use(({ data }) => ({ data, error: null }), (error) => Promise.resolve({ error, data: null }));

  return client;
};
