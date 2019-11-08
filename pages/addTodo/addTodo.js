// pages/addTodo/addTodo.js
const db = wx.cloud.database();
const todos = db.collection('todos')
var format = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: null,
    showTimer: false,
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    // maxDate: new Date(2019, 10, 1).getTime(),
  
    currentDate: new Date().getTime(),
    setTimer: '',
    important: false
  },
  pageData: {
    locationObj: {},
    isImport: false
  },
  isImportant: function() {
    this.pageData.isImport = !this.pageData.isImport
    this.setData({
      important: this.pageData.isImport
    })
  },
  formatTime:function(inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    // return y + '-' + m + '-' + d + ' ' + h + ':' + minute
  },

  showPopup() {
    this.setData({ showTimer: true });
  },

  onClose() {
    this.setData({ showTimer: false });
  },
  onTimer(event) {
    this.setData({
      currentDate: event.detail
    });
  },
  onConfirm: function(event) {
    let timer = this.formatTime(event.detail)
    console.log(timer)
    this.setData({
      setTimer: timer,
      showTimer: false
    });
  },
  onCancel: function (event) {
    this.setData({ showTimer: false });
  },
  onChange: function (event) {
    console.log(event)
  },
  clear: function(e) {
    console.log(e)
  },
  selectImg: function() {
    wx.chooseImage({
      success:res => {
        // console.log(res.tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath: `img_${Math.floor(Math.random()*1000000)}.png`,
          filePath: res.tempFilePaths[0]
        }).then( res =>{
          // console.log(res.fileID)
          this.setData({
            image: res.fileID
          })
        }).catch( err => {
          console.error(err)
        })
      },
    })
  },
  chooseLoc: function(e){
    wx.chooseLocation({
      success: res=> {
        let locObj = {
          latitude: res.latitude,
          longitude: res.longitude,
          name: res.name,
          address: res.address
        }
        this.pageData.locationObj = locObj
        
      },
    })
  },
  bindFormSubmit(event){
    // console.log(event.detail.value)
    todos.add({
      data: {
        title: event.detail.value.title,
        textarea: event.detail.value.textarea,
        image: this.data.image,
        location: this.pageData.locationObj,
        time: this.data.setTimer,
        status: 0,
        formId: event.detail.report,
        isImportant: this.data.important
      }
    }).then( res => {
      // wx.cloud.callFunction({
      //   name: 'msgMe',
      //   data: {
      //     formId: event.detail.report,
      //     taskId: res._id
      //   }
      // })
      wx.showToast({
        title: 'Success',
        icon: 'success',
        success: data => {
          wx.redirectTo({
          url: `../todoInfo/todoInfo?id=${res._id }`,
          })  
        }
      })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '添加'
    })
  },

})