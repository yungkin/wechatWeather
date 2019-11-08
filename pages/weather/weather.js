
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
    temperature:[],
    Ftempre :[],
    Centemp:[],
    Currtemp: "",
    currCtemp:"",
    currFtemp:"",
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
     var futureWeather = results.weather_data;
     //console.log(futureWeather);
     //把温度提取出来
     for (var i in futureWeather) {
       var temp = futureWeather[i].temperature;
       //console.log(temp);
       that.data.temperature.push(temp);
     }
     //各种指数
     var indexResults = results.index;
     //将今日天气的数据提取
     var str = futureWeather[0].date;
     that.data.Currtemp = str.slice(14, 16);

     var wdate = str.slice(0, 9);
     var weekD = str.slice(0, 3);
     //未来三天
     var futureWeather2 = futureWeather.slice(1);
     var curWeather = futureWeather[0].weather;
     //  console.log(futureWeather2);
     //图片操作

     // if (curWeather == "晴"){}

     switch (curWeather) {
       case "晴":
         var src1 = "../../images/d00.gif";
         var src2 = "../../images/n00.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "多云转晴":
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
       case "多云转阴":
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
       case "小雨":
         var src1 = "../../images/d07.gif";
         var src2 = "../../images/n07.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "大雨转小雨":
         var src1 = "../../images/d07.gif";
         var src2 = "../../images/n07.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "多云转小雨":
         var src1 = "../../images/d07.gif";
         var src2 = "../../images/n07.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "中雨转小雨":
         var src1 = "../../images/d07.gif";
         var src2 = "../../images/n07.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "阴转小雨":
         var src1 = "../../images/d08.gif";
         var src2 = "../../images/n08.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "中雨":
         var src1 = "../../images/d08.gif";
         var src2 = "../../images/n08.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "小雨转中雨":
         var src1 = "../../images/d08.gif";
         var src2 = "../../images/n08.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "大雨转中雨":
         var src1 = "../../images/d08.gif";
         var src2 = "../../images/n08.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "阴转中雨":
         var src1 = "../../images/d08.gif";
         var src2 = "../../images/n08.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "大雨":
         var src1 = "../../images/d09.gif";
         var src2 = "../../images/n09.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "中雨转大雨":
         var src1 = "../../images/d09.gif";
         var src2 = "../../images/n09.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "小雨转大雨":
         var src1 = "../../images/d09.gif";
         var src2 = "../../images/n09.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "暴雨":
         var src1 = "../../images/d10.gif";
         var src2 = "../../images/n10.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "大雨转暴雨":
         var src1 = "../../images/d10.gif";
         var src2 = "../../images/n10.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
       case "霾":
         var src1 = "../../images/d53.gif";
         var src2 = "../../images/n53.gif";
         that.data.array[0].src = src1;
         that.data.array[1].src = src2;
         break;
     }

     that.setData({
       currentCity: results.currentCity,
       "weatherData.pm25": results.pm25,
       "weatherData.temp": that.data.Currtemp + "℃",
       "weatherData.weather": futureWeather[0].weather,
       "weatherData.date": wdate,
       "weatherData.wind": futureWeather[0].wind,
       "weatherData.weekD": weekD,
       "weatherData.temperature": that.data.temperature[0],
       futureWeather: futureWeather2,
       temperature: that.data.temperature,
       indexData: indexResults,
       'array': that.data.array
     });
     var temp = that.data.temperature;
     that.data.Centemp = temp;
     // console.log(that.data.Centemp);
     that.data.currCtemp = that.data.Currtemp;
     // console.log(that.data.currCtemp);
     that.data.currFtemp = Math.floor(that.data.Currtemp * 1.8 + 32);
     // console.log(that.data.currFtemp);
     var firTemp = [];
     var lastTemp = [];
     var Ftempfir = [];
     var Ftemplast = [];
     for (var i = 0; i < temp.length; i++) {
       firTemp.push(temp[i].substr(0, 2));
       lastTemp.push(temp[i].substring(5, 7));
       Ftempfir.push(Math.floor(firTemp[i] * 1.8 + 32));
       Ftemplast.push(Math.floor(lastTemp[i] * 1.8 + 32));
     }
     for (var j = 0; j < 4; j++) {
       var strTemp = Ftempfir[j] + "~" + Ftemplast[j] + "℉";
       that.data.Ftempre.push(strTemp);
     }

   });
  },
  LsAction: function(e){
    wx.showActionSheet({
      itemList: ["天气信息不准确","定位信息不准确","无法刷新"],
      itemColor: "#ff3b30",
      success:function(res){
        if(res.tabIndex===0||res.tapIndex===1||res.tapIndex===2){
          wx.showToast({
            title: '反馈成功！'
          })
        }
      }
    });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     var that = this;
    wx.getSetting({
      success: (res) => {
        console.log(res);
        console.log(res.authSetting['scope.userLocation']);
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则天气功能将无法使用',
            success: function (res) {
              if (res.cancel) {
                console.info("授权失败返回数据");

              } else if (res.confirm) {

                wx.openSetting({
                  success: function (data) {
                    console.log(data);
                    if (data.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 5000
                      })
                      //再次授权，调用getLocationt的API
                     that.onLoad();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 5000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == true) {//初始化进入
         that.onLoad();

        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    
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
   // var Bindex = e.currentTarget.dataset.Bindex;
    that.setData({
      showView: !this.data.showView
    });
  },
  Refresh: function (e) {
    console.log("refresh");
    this.onShow();
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

  /*
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
  */

  switchCg: function (e) {
    //οF = ℃ × 1.8 + 32
    //℃ = (οF - 32) / 1.8
    // console.log(e.currentTarget.id);
    var circleId = e.currentTarget.id;
    if (e.target.id == 2 || circleId==2) {//再按返回摄氏温度
      this.setData(
        {
          circleLost: "circleLost",
          circleActived: "circleActived",
          id: "1",
          "weatherData.temp": this.data.currCtemp+"℃",
          "weatherData.temperature": this.data.Centemp[0],
          temperature: this.data.Centemp,
        }
      );
    } else if (e.target.id == 1 ||circleId == 1) { //按钮第一次点击转为华氏温度
      this.setData(
        {

          circleLost: "circleActived",
          circleActived: "circleLost",
          id: "2",
          "weatherData.temp": this.data.currFtemp + "℉",
          "weatherData.temperature": this.data.Ftempre[0],
          temperature: this.data.Ftempre,
        }
      );
    }
  },




})
