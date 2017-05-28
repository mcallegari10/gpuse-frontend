import axios from 'axios'
import auth from '../auth'

export default axios.create({
  baseURL: 'http://823b2419.ngrok.io',
  headers: {
    Authorization: localStorage.getItem('access_token')
  }
  // baseUrl: 'http://gpuse-api.herokuapp.com'
})
