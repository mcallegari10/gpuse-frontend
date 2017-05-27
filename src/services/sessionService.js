import axios from 'axios'

const sessionService = {
  baseUrl: 'http://gpuse-api.herokuapp.com/'
}

sessionService.login = function (email, password) {
  return axios.get(`${this.baseUrl}publishers/sign_in`, { email, password }).then((response) => {
    return response.data
  })
}

sessionService.signUp = function (email, password) {
  return axios.post(`${this.baseUrl}publishers/sign_up`, { email, password }).then((response) => {
    return response.data
  })
}

export default sessionService
