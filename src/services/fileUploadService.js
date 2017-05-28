import api from './api'

const fileUpload = {}

fileUpload.upload = function (frames_attributes, code = 'asd') {
  return api.post('/publishers/publish', { code, frames_attributes })
  .then((response) => {
      return response
    })
}

export default fileUpload
