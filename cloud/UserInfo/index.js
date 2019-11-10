// 云函数入口文件
//使用md5加密openID
const cloud = require('wx-server-sdk')
const md5 = require('md5-nodejs');
cloud.init()
const db = cloud.database();
const user = db.collection('user')
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(event.update == true) {
    //更新当前信息
    try{
      return await user.doc(md5(wxContext.OPENID)).update({
        data:{
          userData: _set(event.userData)
        }
      })
    }catch(e) {
        console.log(e)
    }
  }
  else if(event.getSelf == true) {
    //获取当前用户信息
    try{
      return await user.doc(md5(wxContext.OPENID)).field({
        openid: false
      }).get()
    }catch(e){
      console.error(e)
    }
  }
  else if(event.setSelf == true) {
    //添加当前用户信息
    try{
      return await user.add({
        data: {
          _id: md5(wxContext.OPENID),
          openid: wxContext.OPENID,
          userData:event.userData,
          boughList:[],
          messageList:[],
          ontransList:[]
        }
      })
    }catch(e){
        console.error(e)
    }
  } else if(event.getOthers == true) {
    //获取指定用户信息
    try { 
      return await user.doc(event.userId).field({
        userData:true
      }).get()
     } catch (e) { console.error(e)}
  }
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}