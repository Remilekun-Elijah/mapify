import API from './axios'
import Alert from "./alert"

class BACKEND {
  constructor() {
    this._API = API;
  }

  send({
    type,
    to,
    payload,
    header={},
    cb,
    useAlert=true
  }) {
    return this._API[type](to, payload, header).then(function (response) {
      
      if ([200, 201].includes(response?.status)) {
        if (useAlert) {
          Alert({
            type: 'success',
            message: response?.data?.message,
            cb: _ => cb ? cb(response?.data) : ''
          })
        } else if (cb) cb(response?.data)

        return response?.data
      } else {
          Alert({
            type: 'error',
            message: response?.data?.message
          })
        
        return response?.data
      }
    }).catch(function (e) {
      const err = "error"
      const message = e?.message || e?.[err] || "Something went wrong";
        Alert({
          type: err,
          message
        })
      
      return e
    })
  }
 
  isAuthenticated() {
    return this._API.get('/user').then(function (response) {
      if (response.status === 200) {
        return response.data
      } else {
        return false
      }
    }).catch(function (error) {
      console.log(error)
      return false
    })
  }

}

export default BACKEND;