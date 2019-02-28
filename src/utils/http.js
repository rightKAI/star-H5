import axios from 'axios'

axios.defaults.timeout = 5000
// axios.defaults.baseURL = 'http://192.168.1.245:8090'
// axios.defaults.baseURL = 'http://192.168.1.182:80'
axios.defaults.baseURL = 'https://www.dmallovo.com'
// axios.defaults.baseURL = 'http://192.168.1.29:8090'
// axios.defaults.baseURL = 'http://192.168.1.182:80'
// axios.defaults.baseURL = 'http://192.168.1.29:8090' // 邱的电脑
// axios.defaults.baseURL = 'http://192.168.1.23:8090'

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch (url, params = {}) {
  return new Promise((resolve, reject) => {
    // 显示
    document.getElementsByTagName('body')[0].style.cssText = 'overflow-y: hidden;'
    this.$vux.loading.show({
      text: '正在请求'
    })
    axios.get(url, {
      params: params
    })
      .then(response => {
        this.$vux.loading.hide()
        document.getElementsByTagName('body')[0].style.cssText = 'overflow-y: normal;'
        if (response.data.code === '000001') {
          this.$vux.toast.text(response.data.msg)
          this.$cookies.remove('token')
          setTimeout(() => {
            this.$router.push('/login')
          }, 500)
        } else {
          resolve(response.data)
        }
      })
      .catch(err => {
        this.$vux.loading.hide()
        document.getElementsByTagName('body')[0].style.cssText = 'overflow-y: normal;'
        this.$vux.toast.text('网络异常, 请稍后重试')
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data = {}, params, callBack) {
  return new Promise((resolve, reject) => {
    document.getElementsByTagName('body')[0].style.cssText = 'overflow-y: hidden;'
    this.$vux.loading.show({
      text: '正在请求'
    })
    axios.post(url, data, {params: params})
      .then(response => {
        this.$vux.loading.hide()
        document.getElementsByTagName('body')[0].style.cssText = 'overflow-y: normal;'
        if (response.data.code === '000000') {
          resolve(response.data)
        } else {
          if (callBack) callBack((response.data))
          if (response.data.code === '000001') {
            this.$vux.toast.text(response.data.msg)
            this.$cookies.remove('token')
            setTimeout(() => {
              this.$router.push('/login')
            }, 500)
          } else {
            this.$vux.toast.text(response.data.msg)
            return false
          }
        }
      }, err => {
        this.$vux.loading.hide()
        document.getElementsByTagName('body')[0].style.cssText = 'overflow-y: normal;'
        this.$vux.toast.text('网络异常, 请稍后重试')
        reject(err)
      })
  })
}
