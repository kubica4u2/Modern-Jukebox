let axios = require('axios');

let ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

module.exports =  (options, callback) => {
  if (!options.key) {
    throw new Error('Youtube Search expected key, received undefined');
  }

  let params = {
    part: 'snippet',
    key: options.key,
    q: options.term,
    type: 'video', 
    maxResults: options.amount
  };

  axios.get(ROOT_URL, { params: params })
    .then((response)  => {
      if (callback) { callback(response.data.items); }
    })
    .catch((error) => {
      console.error(error);
    });
};