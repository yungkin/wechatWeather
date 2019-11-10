//app.js

App({
  onLaunch: function (options) {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
   
    // 初始化云开发
      if(!wx.cloud){
        alert("请升级到最新微信开发者工具版本")
      }else{
        wx.cloud.init({
          env:"production-d0x82",
          traceUser: true
        })
      }
    // 获取手机系统信息
    wx.getSystemInfo({
      success: res => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight + 46;
      }, fail(err) {
        console.log(err);
      }
    })
  
    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
    
  },
  getLoginState: function() {
    var that = this
    wx.checkSession({
      success: function() {
        //session_key 未过期，并且在本生命周期一直有效
        return true
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        return false
        //wx.login() //重新登录
      }
    })
  },
  globalData: {
    userInfo: null,
    userId: '',
    auth: {
      'scope.userInfo': false
    },
    logged: false,
    navHeight: 0,
  }
})