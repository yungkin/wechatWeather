// pages/history/history.js
const app = getApp();
var getWeather = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    temperature: [],
    Currtemp: "",
    array: [
      {
        id: 0,
        mode: '白天',
        src: '../../images/d00.gif',
        text: ''
      },
      {
        id: 1,
        mode: '夜间',
        src: '../../images/n00.gif',
        text: ''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 选择城市
  getCity: function (e) {
    // console.log(e.currentTarget.dataset);
    var getCityName = e.currentTarget.dataset.city;
    var getCityId = e.currentTarget.dataset.citycode;
    var currentCity = {
      CityName: getCityName,
      CityId: getCityId
    }
    var BrowsingHistory = wx.getStorageSync('BrowsingHistory');
    // 当没有浏览历史记录
    if (!BrowsingHistory) {
      BrowsingHistory = [];
      BrowsingHistory.push(currentCity);
    } else {
      var checkRepeat = BrowsingHistory.find(item => {
        return item.CityId == getCityId;
      })
      // 当不重复时插入地区
      if (!checkRepeat) {
        BrowsingHistory.unshift(currentCity);
      }
      // 当重复时，先删除再插入
      if (checkRepeat) {
        BrowsingHistory = BrowsingHistory.filter((item) => {
          return item.CityId != getCityId
        })
        // console.log('BrowsingHistory',BrowsingHistory)
        BrowsingHistory.unshift(currentCity);
      }
    }

    // 当长度等于9 删除最后一个
    if (BrowsingHistory && BrowsingHistory.length == 9) {
      BrowsingHistory.pop(1);
    }

    wx.setStorageSync('currentCity', currentCity);
    // 设置一天过期时间
    var timestamp = Date.parse(new Date());
    var currentCity_expiration = timestamp + 60 * 60 * 24 * 1000;
    // var session_expiration = timestamp + 3 * 1000; //测试 10s 过期
    wx.setStorageSync("currentCity_expiration", currentCity_expiration);
    wx.setStorageSync('BrowsingHistory', BrowsingHistory);

    // console.log(this.data.currentCity);
    var that = this;
    var changeCity = e.currentTarget.dataset.city;
    //console.log(changeCity);
    if (changeCity) {
      let pages = getCurrentPages(); //当前页面
      let prevPage = pages[pages.length - 2]; //上一页面
      prevPage.setData({ //直接给上移页面赋值
        currentCity: changeCity,
      });

      this.goBack();
    } else {
      this.goBack();
    }
    this.setData({ city: e.currentTarget.dataset.city })
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
    var that = this;
    var changeCity = this.data.city;
    getWeather.getWeather2(changeCity, function (data) {
      var results = data.results[0];
     // console.log(data.results[0]);
      var futureWeather = results.weather_data;
      //把温度提取出来
      for (var i in futureWeather) {
        var temp = futureWeather[i].temperature;
        //console.log(temp);
        that.data.temperature.push(temp);
      }
      var indexResults = results.index;
      //将今日天气的数据提取
      var str = futureWeather[0].date;
      that.data.Currtemp = str.slice(14, 16);

      var wdate = str.slice(0, 9);
      var weekD = str.slice(0, 3);
      //未来三天
      var futureWeather2 = futureWeather.slice(1);
      //图片操作
      var curWeather = futureWeather[0].weather;
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
        case "暴雨" || "大雨转暴雨":
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

      let pages = getCurrentPages(); //当前页面
      let prevPage = pages[pages.length - 2]; //上一页面

      prevPage.setData({ //直接给上一页面赋值
        currentCity: changeCity,
        "weatherData.pm25": results.pm25,
        "weatherData.temp": that.data.Currtemp + "℃",
        "weatherData.weather": futureWeather[0].weather,
        "weatherData.date": wdate,
        "weatherData.wind": futureWeather[0].wind,
        "weatherData.weekD": weekD,
        "weatherData.temperature": that.data.temperature[0],
        temperature: that.data.temperature,
        futureWeather: futureWeather2,
        indexData: indexResults,
        'array': that.data.array
      });

    });
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
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onShow: function () {
    var BrowsingHistory = wx.getStorageSync('BrowsingHistory');
    this.setData({
      BrowsingHistory: BrowsingHistory
    })
  },
})