// pages/todoInfo/todoInfo.js
const db =wx.cloud.database();
const todos = db.collection('todos')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task: ''
  },
pageData: {

},
edit:function() {

  },
confirm: function(){
    todos.doc(this.pageData.id).update({
      // data 传入需要局部更新的数据
      data: {
        status: 1
      }
    }).then( res=> {
      this.onLoad()
    })
  },
  viewLoc: function() {
    wx.openLocation({
      latitude: this.data.task.location.latitude,
      longitude: this.data.task.location.longitude,
      name: this.data.task.location.name,
      address: this.data.task.location.address
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // console.log(options)
    wx.setNavigationBarTitle({
      title: '查看内容'
    })
      this.pageData.id = options.id 
      todos.doc(options.id).get().then( res =>{
        // console.log(res)
        this.setData({
          task: res.data
        })
      })
  },  

 
})