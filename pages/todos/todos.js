// pages/todos/todos.js
const db =wx.cloud.database();
const todos = db.collection('todos')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabactive: 2,
    activeNames: ['1'], 
    fixed: false,
    isHide: false,
    tasks: [],
    userInfo: {}
  },
  pageData: {
    isHide: true,
    skip:0,
    tasks:[]
  },
 
  viewCenter: function() {
      this.pageData.isHide = !this.pageData.isHide
    // console.log(this.pageData.isHide)
      this.setData({
        isHide: !this.pageData.isHide
      })
  },
  onTabChange(event) {
    // console.log(event.detail);
    this.setData({
      tabactive: event.detail,
    })
    
  },
  onSideChange(event) {
    this.setData({
      activeNames: event.detail
    });

  },
  godoAdd(){
    wx.navigateTo({
      url: '../addTodo/addTodo',
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow:function() { 
    // this.setData({
    //   tasks: []
    // })
    this.getData()
    //获取用户信息
    // console.log(app.getLoginState())
    if (app.globalData.auth['scope.userInfo']) {
        wx.cloud.callFunction({
          name: 'UserInfo',
          data: {
            getSelf: true
          },
          success: res => {
            if (res.errMsg == "cloud.callFunction:ok")
              if (res.result) {
                // console.log(res)
                this.setData({
                  userInfo: res.result.data.userData
                })

              }
          }
        })
      }
   
  },
  onLoad: function (options) {
    // this.getData( res => {})
    wx.requestSubscribeMessage({
      tmplIds: ['nKDjm3Xa6mE8dZKtW6lyMVzgiNkI-rNTgQJYty09mis'],
      success(res) { 
        console.log(res)
      }
    })
    wx.setNavigationBarTitle({
      title: '记事'
    })
      
  },
  getData: function (callback) {
    if(!callback) {
      callback = res => {}
    }
    wx.showLoading({
      title: '数据加载中',
    })
    //this.data.tasks.length>10
     
    if (1){
      todos.skip(this.pageData.skip).get().then(res => {
        let oldData = this.data.tasks
        this.setData({
          tasks: oldData.concat(res.data)
        }, res => {
          this.pageData.skip = this.pageData.skip+ 20
          wx.hideLoading()
          callback()
        })
      })
    }
    // else{
    //   todos.get().then(res =>{
    //     this.setData({
    //       tasks: res.data
    //     }, res => {
    //       wx.hideLoading()
    //       callback()
    //     })
    //   })
     
    // }
   
  },
  onPullDownRefresh: function() {
    this.getData( res => {
      wx.stopPullDownRefresh();
      this.pageData.skip = 0;
    })
   
  },
  onReachBottom: function() {
    this.getData()
  },
 
})