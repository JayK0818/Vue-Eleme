import axios from 'axios'
const instance = axios.create({})

instance.interceptors.response.use(function (res) {
  const { code, data } = res.data
  switch (code) {
    case 1:
      return data
    default:
      return data
  }
})

export default instance
