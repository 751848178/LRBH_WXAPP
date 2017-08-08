import Promise from 'utils/promise'
import Check from 'utils/check'

App({
  onLaunch: function() {
    //检查版本
    Check.version().then(res => {
      //检查token
      return Check.session()
    }).catch(err => {
      console.log('onLaunch->error->')
      console.log(err)
    })
  },
  getToken: function() {
    return this.globalData.token
  },
  getUserinfo: function() {
    return this.globalData.userInfo
  },
  globalData: {
    userInfo:null,
    token:null
  }
})