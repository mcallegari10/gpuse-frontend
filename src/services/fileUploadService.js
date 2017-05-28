import api from './api'

const fileUpload = {}

fileUpload.upload = function (code = 'asd') {
  return api.post('/publishers/publish', { code })
  .then((response) => {
      return response
    })
}

fileUpload.uploadFrames = function (published_code_id, index, file) {
  return api.post('/publishers/upload_frames', {
    published_code_id,
    index,
    file
  })
  .then((response) => {
      return response
    })
}

fileUpload.poll = function (published_code_id) {
  return api.get(`/publishers/completed_publication?published_code_id=${published_code_id}`)
  .then((response) => {
      return response
  })
}

export default fileUpload
