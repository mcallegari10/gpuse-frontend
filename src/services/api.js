import axios from 'axios'
import auth from '../auth'

export default axios.create({
  //baseURL: 'http://1e8a0fde.ngrok.io',
  //baseURL: 'http://gpuse-api.herokuapp.com',
  baseURL: 'http://10.0.0.52:3000',
  headers: {
    Authorization: localStorage.getItem('access_token')
  }
})
