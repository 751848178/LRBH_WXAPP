import Promise from 'vendor/es6-promise.min'
import Config from 'config'
import Check from 'check'

function promisify() {
  wx.p = {} // wx.pro 下面挂载着返回 promise 的 wx.API
  wx.config = Config
  // 普通的要转换的函数
  const functionNames = [
    'login',
    'getUserInfo',
    'navigateTo',
    'checkSession',
    'getStorageInfo',
    'removeStorage',
    'clearStorage',
    'getNetworkType',
    'getSystemInfo',
    'showModal',
    'showActionSheet',
    'getSetting',
    'openSetting',
    'switchTab',
    'authorize',
    'getStorage',
    'setStorage',
    'navigateBack',
    'redirectTo',
    'makePhoneCall',
    'getLocation',
    'chooseLocation',
    'openLocation',
    'createMapContext'
  ]

  functionNames.forEach(fnName => {

    wx.p[fnName] = (obj = {}) => {
      return new Promise((resolve, reject) => {
        obj.success = (res) => {
          res.success = true
          // console.log(`wx.${fnName} success`, res)
          resolve(res)
        }
        obj.fail = (err) => {
          err.success = false
          // console.error(`wx.${fnName} fail`, err)
          resolve(err)
        }
        wx[fnName](obj)
      })
    }
  })

  //全局返回错误
  wx.p.error = (err) => {
    err.success = false
    return Promise.reject(err)
  }

  //全局中断
  wx.p.break = () => {
    return Promise.reject({
      success: true
    })
  }
  //返回成功
  wx.p.success = (res) => {
    if (res) {
      res.success = true
      return Promise.resolve(res)
    }
    else {
      return Promise.resolve({
        success: true
      })
    }

  }
  //返回失败
  wx.p.fail = () => {
    return Promise.resolve({
      success: false
    })
  }

  wx.p.request = (api, params = '') => {
    console.log(params);
    let url = Config.hosts[Config.env] + api.url
    let data = {}
    if (api.method == 'GET') {
      url = url + '/' + params
    }
    else {
      data = params
    }
    // console.log(data);
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: api.method,
        data: data,
        header: {
          'apiVersion': Config.apiVersion[Config.env],
          'token': getApp().getToken() || '',
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          if (res.statusCode >= 400) {
             wx.p.showModal({
                title: '提示',
                content: '网络请求失败',
                showCancel: false
              })
            console.error('wx.request fail [server]', res.data.code, res.data)
            res.data.success = false
            resolve(res.data)
          }
          else if (res.data.code != 0) {
            switch (res.data.code) {
              case 403:
                  wx.p.removeStorage({
                    key: 'token'
                  }).then(res => {
                    return Check.session()
                  }).then(res => {
                    wx.reLaunch({
                      url: 'my'
                    })
                  })
                break
              case 302:
                   wx.p.showModal({
                      title: '提示',
                      content: '请先去登录或者注册',
                      showCancel: false
                    }).then(res => {
                      wx.reLaunch({
                        url: '/pages/common/registered'
                      })
                    })
                break
              default:
                wx.p.showModal({
                  title: '提示',
                  content: res.data.message,
                  showCancel: false
                })
            }
            console.error('wx.request fail [api]', res.data.code, res.data)
            res.data.success = false
            resolve(res.data)
          }
          else {
            // console.log('wx.request success', res.data)
            res.data.success = true
            resolve(res.data)
          }
        },
        fail: err => {
          // console.error('wx.request fail [network]', err)
          err.success = false
          reject(err)
        }
      })
    })

  }
}

promisify()

module.exports = Promise