import Config from 'config'

//检查登录态
function session() {
  return wx.p.checkSession().then(res => {
    if (res.success) {
      //取缓存token
      return wx.p.getStorage({
        key: 'token'
      }).then(res => {
        if (res.success && res.data) {
          getApp().globalData.token = res.data
          return wx.p.success()
        }
        else {
          return wx.p.fail()
        }
      })
    }
    //失败，清除token缓存
    return wx.p.removeStorage({
      key: 'token'
    }).then(res => {
      if (!res.success) {
        return wx.p.error('removeStorage')
      }
      return wx.p.fail()
    }) 
  }).then(res => {
    //检查userinfo
    if (res.success) {
      return userinfo()
    }
    //去登录
    else {
      return token().then(res => {
        if(!res.success) {
          return wx.p.error('token')
        }
        return userinfo()
      }).then(res => {
        return wx.p.request(Config.api.auth.userinfo, {
          encryptedData: res.encryptedData,
          iv: res.iv
        })
      })
    }
  }).catch(err => {
    if (!err.success) {
      console.log(err)
      return network()
    }
    return wx.p.success()
  })
}

//获取Userinfo
function userinfo() {
  //检查用户权限
  return scopeUserinfo().then(res => {
    if (!res.success) {
      return wx.p.error(res)
    }
    // 取用户信息
    return wx.p.getUserInfo({
      withCredentials: true
    })
  }).then(res => {
    if (!res.success) {
      return wx.p.error(res)
    }
    getApp().globalData.userInfo = res
    return wx.p.success(res)
  }).catch(err => {
    if (!err.success) {
      console.log(err)
      return network()
    }
    return wx.p.success()
  })
}

//获取token
function token() {
  //去登录
  return wx.p.login().then(res => {
    if (!res.success) {
      return wx.p.error('login')
    }
    //提交code换token
    return wx.p.request(Config.api.auth.token, res.code)
  }).then(res => {
    if (!res.success) {
      return wx.p.error(res.message)
    }
    getApp().globalData.token = res.result.token
    //成功，把token写入缓存
    return wx.p.setStorage({
      key: 'token',
      data: res.result.token
    })
  }).catch(err => {
    if (!err.success) {
      console.log(err)
      return network()
    }
    return wx.p.success()
  })
}
 

function network() {
  return {}/**wx.p.showModal({
    title: '提示',
    content: '请检查网络',
    showCancel: false,
    confirmText: '重试'
  }).then(res => {
    // return session()
  })*/
}

//检查用户信息授权
function scopeUserinfo() {
  return scopeFactory('userInfo', '授权之后才能更好的使用哦')
}

//检查用户位置
function scopeUserLocation() {
  return scopeFactory('userLocation', '授权之后才能获取您的位置')
}

//检查授权工厂
function scopeFactory(scope, description) {
  return wx.p.getSetting().then(res => {
    if (!res.success) {
      return wx.p.error('getSetting')
    }
    //已授权
    if (res.authSetting['scope.' + scope]) {
      return wx.p.break()
    }

    //未授权，去授权
    return wx.p.authorize({
      scope: 'scope.' + scope
    })
  }).then(res => {
    //授权允许
    if (res.success) {
      return wx.p.break()
    }

    //授权拒绝
    return wx.p.showModal({
      title: '提示',
      content: description,
      showCancel: true,
      cancelText: '刷新',
      confirmText: '去授权'
    })
  }).then(res => {
    if (!res.success) {
      return wx.p.error('model')
    }
    //刷新
    if (res.cancel) {
      return scopeFactory(scope, description)
    }
    //去授权
    else if (res.confirm) {
      return wx.p.openSetting()
    }
  }).then(res => {
    //刷新动作
    return scopeFactory(scope, description)
  }).catch(err => {
    if (err.success) {
      return Promise.resolve({
        success: true
      })
    }
  })
}

// 版本检查，强制更新
function version() {
  //检查API使用
  if (wx.canIUse('getSetting')){
    return Promise.resolve({
      success: true
    })
  }
  else {
    return wx.p.redirectTo({
      url: 'pages/common/update'
    })
  }
}

module.exports = {
  session,
  scopeUserinfo,
  scopeUserLocation,
  version
}