//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database();
const userinfo = db.collection('user')
Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // login:function() {
  //   //checkSession检查登录态（通过session_key，openid来得到）是否过期
  //   wx.checkSession({
  //     success() {
  //       console.log("success")
  //     },
  //     fail() {
  //       var that = this;
  //       //登录
  //       wx.login({
  //         success(res) {
  //           if (res.code) {
  //             //获取code
  //             var code = res.code;
  //             //在小程序规定请求地址通过appId，appSecret，登录时获取的code 来获得json数据
  //             var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + that.data.appId + '&secret=' + that.data.secret + 'SECRET&js_code=' + code + '&grant_type=authorization_code';
  //             //向服务器发起请求获取session_key，openid
  //             wx.request({
  //               url: url,
  //               data: {
  //                 session_key: "",
  //                 openid: ""
  //               }
  //             })
  //           }
  //           else {
  //             console.log('登录失败！' + res.errMsg)
  //           }
  //         }
  //       })
  //     }
  //   })
  // },
  onLoad: function () {
    let _this = this
    //需要用户同意授权获取自身相关信息
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          //将授权结果写入app.js全局变量
          app.globalData.auth['scope.userInfo'] = true
          //从云端获取用户资料
          wx.cloud.callFunction({
            name: 'UserInfo',
            data: {
              getSelf: true
            },
            success: res => {
              if (res.errMsg == "cloud.callFunction:ok" && res.result) {
                //如果成功获取到
                //将获取到的用户资料写入app.js全局变量
                console.log(res)
                app.globalData.userInfo = res.result.data.userData
                app.globalData.userId = res.result.data._id
                _this.setData({
                  hasUserInfo: true
                })
                wx.reLaunch({
                  url: '../todos/todos',
                })
              } else {
                _this.setData({
                  hasUserInfo: false
                })
                console.log("未注册")
              }
            },
            fail: err => {
              _this.setData({
                hasUserInfo: false
              })
              wx.showToast({
                title: '请检查网络您的状态',
                duration: 800,
                icon: 'none'
              })
              console.error("UserInfo调用失败", err.errMsg)
            }
          })
        } else {
          _this.setData({
            hasUserInfo: false
          })
          console.log("未授权")
        }
      },
      fail(err) {
        _this.setData({
          hasUserInfo: false
        })
        wx.showToast({
          title: '请检查网络您的状态',
          duration: 800,
          icon: 'none'
        })
        console.error("wx.getSetting调用失败", err.errMsg)
      }
    })

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    var _this = this
    if(e.detail.errMsg == "getUserInfo:ok"){
      app.globalData.auth['scope.userInfo'] = true

      wx.cloud.callFunction({
        name: 'UserInfo',
        data:{
          getSelf: true
        },
        success: res => {
          if(res.errMsg == "cloud.callFunction:ok")
            if(res.result) {
              app.globalData.userInfo = res.result.data.userData
              app.globalData.userId = res.result.data._id
              _this.setData({
                hasUserInfo: true
              })
              wx.showToast({
                title: '授权成功',
                duration: 1000
              })
              wx.reLaunch({
                url: '../todos/todos',
              })
            }
            else{
              // console.log("未注册")
              _this.register({
                nickName: e.detail.userInfo.nickName,
                gender: e.detail.userInfo.gender,
                avatarUrl: e.detail.userInfo.avatarUrl,
                region: ['none', 'none', 'none'],
              
              })
            }
        },
        fail: err => {
          wx.showToast({
            title: '请检查网络您的状态',
            duration: 800,
            icon: 'none'
          })
          console.error("UserInfo调用失败", err.errMsg)
        }
      })
    } 
    else{
      console.log("未授权")
    }
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // },() => {
    //   wx.showToast({
    //     title: '获取成功',
    //     duration: 2000
    //   })
    //   this.setUser()
    //   wx.reLaunch({
    //     url: '../todos/todos',
    //   })
    // }
    // )
  },
  // setUser: function() {
  //   userinfo.add({
  //     data: {
  //       avatar: userInfo.avatarUrl,
  //       nickName: userInfo.nickName
  //     }
  //   }).then( res => {
  //     console.log("用户存储成功")
  //   })
  // },
  /**
   * 注册用户信息
   */
  register: function (e) {
    let _this = this
    wx.cloud.callFunction({
      name: 'UserInfo',
      data: {
        setSelf: true,
        userData: e
      },
      success: res => {
        if (res.errMsg == "cloud.callFunction:ok" && res.result) {
          _this.setData({
           hasUserInfo: true
          })
          app.globalData.userInfo = e
          app.globalData.userId = res.result._id
          _this.data.registered = true
          app.getLoginState()
          // console.log(res)
          wx.showToast({
            title: '授权成功',
            duration: 1000
          })
          wx.reLaunch({
            url: '../todos/todos',
          })
        } else {
          console.log("注册失败", res)
          wx.showToast({
            title: '请检查网络您的状态',
            duration: 800,
            icon: 'none'
          })
        }
      },
      fail: err => {
        wx.showToast({
          title: '请检查网络您的状态',
          duration: 800,
          icon: 'none'
        })
        // console.error("UserInfo调用失败", err.errMsg)
      }
    })
  },
})
