import axios from 'axios';

export const cordsFromAddress = (addr, GOOGLE_API_KEY) => {
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${GOOGLE_API_KEY}`)
    .then(res => res.data.results[0].geometry.location)
    .catch(err => console.error(err));
};