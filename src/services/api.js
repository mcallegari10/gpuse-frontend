import axios from 'axios'
import auth from '../auth'

export default axios.create({
  // baseURL: 'http://823b2419.ngrok.io',
  baseURL: 'http://gpuse-api.herokuapp.com',
  headers: {
    Authorization: localStorage.getItem('access_token')
  }
})
