// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database(); 
const todos = db.collection('todos')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let myDate = new Date;
  let month = myDate.getMonth() +1;
  let day = myDate.getDay();
  let year = myDate.getFullYear();
  let hour = myDate.getHours();
  let min = myDate.getMinutes();
  let time = `${year}-${month}-${day} ${hour}:${min}:00`
  let taxks =await todos.where({
    status: 0,
    time: time
  }).get()

  for(let i=0;i<taxks.data.length;i++){
    await cloud.callFunction({
        name: 'msgMe',
        data: {
          formId: taxks.data[i].formId,
          taskId: taxks.data[i]._id
        }
      })
  }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}