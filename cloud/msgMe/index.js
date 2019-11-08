// 云函数入口文件
const cloud = require('wx-server-sdk')
const {
  WXMINIUser,
  WXMINIMessage
} = require('wx-js-utils');

const appId = 'wx38a10a86075e965b'; // 小程序 appId
const secret = '9c982b0e7fc482115249a678d8e90b4a'; // 小程序 secret
const template_id = 'nKDjm3Xa6mE8dZKtW6lyMVzgiNkI-rNTgQJYty09mis'; // 小程序模板消息模板 id
cloud.init()
const db = cloud.database(); //在服务端获取数据库不需要wx命名空间，云函数上const db = wx.cloud.database这一句把wx.去掉，官方文档里分为小程序端和服务端，有区别的
const todos = db.collection('todos')
// 云函数入口函数
exports.main = async (event, context) => {
const wxContext = cloud.getWXContext()
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  // 获取 access_token
  let wXMINIUser = new WXMINIUser({
    appId,
    secret
  });

  let access_token = await wXMINIUser.getAccessToken();

  const touser = wxContext.OPENID; // 小程序用户 openId，从用户端传过来，指明发送消息的用户
  const form_id = event.formId; // 小程序表单的 form_id，或者是小程序微信支付的 prepay_id
 
 let task = await todos.doc(event.taskId).get()

  // 发送模板消息
  let wXMINIMessage = new WXMINIMessage();
  let result = await wXMINIMessage.sendMessage({
    access_token,
    touser,
    form_id,
    template_id,
    data: {
      keyword1: {
        value: task.data.title // keyword1 的值
      },
      keyword2: {
        value: task.data.time // keyword2 的值
      },
      keyword3: {
        value: task.data.textarea // keyword2 的值
      },
      keyword4: {
        value: task.data.status== 1? '已完成': '未完成' // keyword2 的值
      },
      keyword5: {
        value: task.data.location ? task.data.location.address: '没有添加位置信息'  // keyword2 的值
      }
    },
    page: `pages/todoInfo/todoInfo?id={{task.data._id}}` // 点击模板消息后，跳转的页面
  });
  return result;
}