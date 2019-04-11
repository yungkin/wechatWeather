var city = require('../../utils/city.js');
var getWeather = require("../../utils/util.js");
const app = getApp()
Page({
  data: {
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    // tHeight: 0,
    // bHeight: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
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
    ], 
    
    city: "上海市",
    hotcityList: [{ cityCode: 110000, city: '北京市' }, { cityCode: 310000, city: '上海市' }, { cityCode: 440100, city: '广州市' }, { cityCode: 440300, city: '深圳市' }, { cityCode: 330100, city: '杭州市' }, { cityCode: 320100, city: '南京市' }, { cityCode: 420100, city: '武汉市' }, { cityCode: 410100, city: '郑州市' }, { cityCode: 120000, city: '天津市' }, { cityCode: 610100, city: '西安市' }, { cityCode: 510100, city: '成都市' }, { cityCode: 500000, city: '重庆市' }]
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var searchLetter = city.searchLetter;
    var cityList = city.cityList();
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var itemH = winHeight / searchLetter.length;
    var tempObj = [];

    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp)
    }

    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      cityList: cityList,
      currentCity: options.currtCity

    })

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    var that = this;
    var changeCity = this.data.city;
    getWeather.getWeather2(changeCity, function (data) {
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

      prevPage.setData({ //直接给上移页面赋值
        currentCity: changeCity,
        "weatherData.pm25": results.pm25,
        "weatherData.temp": temp,
        "weatherData.weather": futureWeather[0].weather,
        "weatherData.date": wdate,
        "weatherData.wind": futureWeather[0].wind,
        futureWeather: futureWeather,
        indexData: indexResults,
        'array': that.data.array
      });
    });
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  clickLetter: function (e) {
    //console.log(e.currentTarget.dataset.letter)
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },

  // 选择城市
  bindCity: function (e) {
   // console.log(e.currentTarget.dataset);
    var getCityName = e.currentTarget.dataset.city;
    var getCityId = e.currentTarget.dataset.citycode;
  //  console.log(getCityName);
  //  console.log(getCityId);
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
        currentCity: changeCity
      });
     
      this.goBack();
    } else {
      this.goBack();
    }
    this.setData({ city: e.currentTarget.dataset.city })
  },
  // 当前定位城市
  myCity: function () {
    currentCity = this.data.currentCity;
    console.log(this.data);
    var currentCity = {
      CityName: currentCity,
      CityId: this.data.CityId
    }
    wx.setStorageSync('currentCity', currentCity);
    // 设置一天过期时间
    var timestamp = Date.parse(new Date());
    var currentCity_expiration = timestamp + 60 * 60 * 24 * 1000;
    wx.setStorageSync("currentCity_expiration", currentCity_expiration);
    this.goBack();
  },
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //选择热门城市
  bindHotCity: function (e) {
    console.log("bindHotCity")
    this.setData({
      city: e.currentTarget.dataset.city
    })
  },
  //点击热门城市回到顶部
  hotCity: function () {
    this.setData({
      scrollTop: 0,
    })
  }
})