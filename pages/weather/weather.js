
const app = getApp();
var getWeather = require("../../utils/util.js");
var bmap = require('../../libs/bmap-wx.min.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    time: "",
    circleActived:"circleActived",
    circleLost: "circleLost",
   
    id:"1",
    currentCity:"",
    indexData:{},
    weatherData: {},
    futureWeather: {},
    showView: true,
    array: [
      {
        id:0,
      mode: '白天',
      src: '../../images/d00.gif',
      text: ''
    }, 
    {
      id:1,
        mode: '夜间',
        src: '../../images/n00.gif',
        text: ''
      }
    ], 
   
    canIUse: wx.canIUse('button.open-type.getUserInfo')
   
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
 onLoad: function (options) {
   var that = this;
  
   getWeather.loadWeatherData(function (data) {
     var results = data.results[0];
     console.log(data.results[0]);

     var futureWeather = results.weather_data;
     var indexResults = results.index;
     var str = futureWeather[0].date;
     var temp = str.slice(9);
     var wdate = str.slice(0, 9);
     //图片操作
     var curWeather = futureWeather[0].weather;
     switch (curWeather) {
        case "晴":
         var src1 = "../../images/d00.gif";
         var src2 = "../../images/n00.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "多云":
         var src1 = "../../images/d01.gif";
         var src2 = "../../images/n01.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "阴":
         var src1 = "../../images/d02.gif";
         var src2 = "../../images/n02.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "阵雨":
         var src1 = "../../images/d03.gif";
         var src2 = "../../images/n03.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "雷阵雨":
         var src1 = "../../images/d04.gif";
         var src2 = "../../images/n04.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "小雨" || "大雨转小雨":
         var src1 = "../../images/d07.gif";
         var src2 = "../../images/n07.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "中雨" || "小雨转中雨":
         var src1 = "../../images/d08.gif";
         var src2 = "../../images/n08.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "大雨" || "中雨转大雨":
         var src1 = "../../images/d09.gif";
         var src2 = "../../images/n09.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "暴雨"||"大雨转暴雨":
         var src1 = "../../images/d10.gif";
         var src2 = "../../images/n10.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "霾" :
         var src1 = "../../images/d53.gif";
         var src2 = "../../images/n53.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
     }
  
     that.setData({
       currentCity: results.currentCity,
       "weatherData.pm25": results.pm25,
       "weatherData.temp": temp,
       "weatherData.weather": futureWeather[0].weather,
       "weatherData.date": wdate,
       "weatherData.wind": futureWeather[0].wind,
       "weatherData.dayPic": futureWeather[0].dayPictureUrl,
       "weatherData.nightPic": futureWeather[0].nightPictureUrl,
       futureWeather: futureWeather,
       indexData: indexResults,
       'array': that.data.array
     });

   });
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  showData: function (e) {
    var that = this;
    //console.log(e);
    var index = e.currentTarget.dataset.index;
    that.setData({
      showView: !this.data.showView
    });
  },
  Refresh: function (e) {
    console.log("refresh");
    this.onLoad();
  },

  Search: function (e) {
    var that = this;
    wx.navigateTo({
      url: "../cities/cities?currtCity=" + that.data.currentCity
    })
  },

  Browse: function (e) {
    var that = this;
    wx.navigateTo({
      url: "../history/history"
    })
   },

  ChangDate: function (e) {
    console.log("日期定为", e.detail.value);
    this.setData(
      { date: e.detail.value }
    )
  },
  ChangTime: function (e) {
    console.log("时间定为", e.detail.value);
    this.setData(
      { time: e.detail.value }
    )
  },
  switchCg: function (e) {

    if (e.target.id == 1) {
      this.setData(
        {
          circleLost: "circleActived",
          circleActived: "circleLost",
          id: "2"
        }
      );
    } else if (e.target.id == 2) { //按钮第一次点击转为华氏温度
      this.setData(
        {
          circleLost: "circleLost",
          circleActived: "circleActived",
          id: "1"
        }
      );
    }
  },




})
