import axios from 'axios'

const sessionService = {
  baseUrl: ''
}

sessionService.login = function (email, password) {
  return axios.post(`${this.baseUrl}users/sessions`, { email, password }).then((response) => {
    return response.data
  })
}

export default sessionService
