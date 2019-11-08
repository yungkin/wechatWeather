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
    userInfo: ''
  },
  pageData: {
    isHide: true,
    skip:0
  },
  viewCenter: function() {
      this.pageData.isHide = !this.pageData.isHide
    console.log(this.pageData.isHide)
      this.setData({
        isHide: !this.pageData.isHide
      })
  },
  onTabChange(event) {
    console.log(event.detail);
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
  onLoad: function (options) {
    wx.requestSubscribeMessage({
      tmplIds: ['nKDjm3Xa6mE8dZKtW6lyMVzgiNkI-rNTgQJYty09mis'],
      success(res) { 
        console.log(res)
      }
    })
    wx.setNavigationBarTitle({
      title: '记事'
    })
      this.getData( res => {})
      // this.getData()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },
  getData: function (callback) {
    // if(!callback) {
    //   callback = res => {}
    // }
    wx.showLoading({
      title: '数据加载中',
    })
    todos.skip(this.pageData.skip).get().then(res => {
      let oldData = this.data.tasks
      this.setData({
        tasks: oldData.concat(res.data)
      }, res => {
        this.pageData.skip += 20
        wx.hideLoading()
        callback()
      })
    })
  },
  onPullDownRefresh: function() {
    this.getData( res => {
      wx.stopPullDownRefresh();
      this.pageData.skip = 0;
    })
   
  },
  onReachBottom: function() {
    this.getData(res => {})
  },
 
})