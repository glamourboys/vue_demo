import axios from 'axios'
const ERR_NO = 0

export function get(url) {
  return function (params) {
    // console.log(url)
    return axios.get(url, {
      params
    }).then((res) => {
      const {
        errno,
        data
      } = res.data; // 解构赋值
    //   console.log(res.data)
      if (errno === ERR_NO) { // errno状态码为0成功，若真实接口可添加其他状态
        return data
      }
    }).catch((req) => { // 错误回调信息
      console.log(req)
    })
  }
}
