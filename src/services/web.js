import { axiosInstance as axios } from 'src/boot/axios.js'

export function createShortUrl (params) {
  return axios({
    url: '/shortUrl',
    method: 'post',
    params: params
  })
}
