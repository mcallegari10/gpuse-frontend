import axios from 'axios'

const sessionService = {
  baseUrl: 'http://gpuse-api.herokuapp.com/'
}

sessionService.login = function (username, password) {
  return axios.get(`${this.baseUrl}publishers/sign_in?username=${username}&password=${password}`).then((response) => {
    return response.data
  })
}

sessionService.signUp = function (username, password) {
  return axios.post(`${this.baseUrl}publishers/sign_up`, { username, password }).then((response) => {
    return response.data
  })
}

export default sessionService
