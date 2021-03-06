import api from './api'

const sessionService = { }

sessionService.login = function (username, password) {
  return api.get('/publishers/sign_in?username='+username+'&password=' + password).then((response) => {
    return response.data
  })
}

sessionService.signUp = function (username, password) {
  return api.post('/publishers/sign_up', { username, password }).then((response) => {
    return response.data
  })
}

export default sessionService
