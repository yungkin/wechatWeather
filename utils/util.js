var bmap = require('../libs/bmap-wx.min.js'); 
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatTimeYear = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const formatTimeHour = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [hour, minute].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//获取经纬度
function getLocation(callback) {
  wx.getLocation({
    type: 'wgs84',//gcj02
    success: function (res) {
      callback(true, res.latitude, res.longitude);//返回值
    },
    fail: function () {
      callback(false);
    }
  })
}
//获取天气信息
function getWeather(latitude, longitude, callback) {
  var ak = "AHCD1gYEyL3dGPFbIxYrgXH4xQWNd6C4";
  var url = "https://api.map.baidu.com/telematics/v3/weather?location=" + longitude + "," + latitude + "&output=json&ak=" + ak; //接口请求和参数传递

  wx.request({
    url: url,
    success: function (res) {
      callback(res.data);
    }

  });
}
//加载天气数据
function loadWeatherData(callback) {
  //调用
  getLocation(function (success, latitude, longitude) {
    if (success == false) {
      var lat = 27.8;
      var longit = 118.03;
      getWeather(lat, longit, function (weatherData) {
        callback(weatherData);
      
      });
      console.log(501);
      }else{
      getWeather(latitude, longitude, function (weatherData) {
        callback(weatherData);
      });
      }
  });

}
//获取城市
function getWeather2(city, callback) {
  var ak = "AHCD1gYEyL3dGPFbIxYrgXH4xQWNd6C4";
  var url = "https://api.map.baidu.com/telematics/v3/weather?location=" + city + "&output=json&ak=" + ak; //接口请求和参数传递

  wx.request({
    url: url,
    success: function (res) {
      callback(res.data);

    }

  });
}

//注册函数，暴露
module.exports = {
  formatTime: formatTime,
  formatTimeYear: formatTimeYear,
  formatTimeHour: formatTimeHour,
  getWeather2: getWeather2,
  loadWeatherData: loadWeatherData
}



