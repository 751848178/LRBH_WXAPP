/* 
  development 开发环境
  production 生产环境
*/

const env = 'development' // 'development' or 'production'

const apiVersion = {
  development: '1.0.0',
  production: '1.0.0'
}

const hosts = {
  development: 'http://192.168.5.125:8090',
  production: 'http://localhost:8080'
}

const api = {
  auth: {
    token: {
      method: 'GET',
      url: '/auth/app/token'
    },
    userinfo: {
      method: 'POST',
      url: '/auth/app/userinfo'
    }
  },
  user: {
    info: {
      method: 'GET',
      url: '/user/info'
    },
    coupon: {
      method: 'GET',
      url: '/user/coupon'
    },
    couponInfo:{
      method: 'GET',
      url: '/user/coupon/info'
    },
    operation: {
      method: 'GET',
      url: '/user/operation'
    },
    operationInfo: {
      method: 'GET',
      url: '/user/operation/info'
    },
    integralInfo: {
      method: 'GET',
      url: '/user/integral/info'
    }
  },
  coin: {
    present: {
      method: 'GET',
      url: '/coin/present'
    },
    income: {
      method: 'GET',
      url: '/coin/income'
    },
    info: {
      method: 'GET',
      url: '/coin/info'
    },
    makeOver: {
      method: 'POST',
      url: '/coin/makeOver'
    },
    target:{
      method: 'GET',
      url: '/coin/target'
    }
  },
  inquiry: {
    info: {
      method: 'GET',
      url: '/inquiry/info'
    },
    complain: {
      method: 'POST',
      url: '/inquiry/complain'
    },
    operation: {
      method: 'POST',
      url: '/inquiry/operation'
    }
  },
  taxi: {
    add: {
      method: 'POST',
      url: '/server/order/add'
    }
  },
  common: {
    code: {
      method: 'POST',
      url: '/user/send'
    },
    login: {
      method: 'POST',
      url: '/user/login'
    },
    reg: {
      method: 'POST',
      url: '/user/register'
    }
  }
}

module.exports = {
  hosts,
  api,
  env,
  apiVersion
}

 