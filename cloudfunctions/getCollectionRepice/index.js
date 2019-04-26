// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let list = await db.collection('collection-repice')
    .where({
      userID: event.openID
    })
    .orderBy('createTime','asc')
    .get()
  
  list.forEach(item => {
    db.collection('user')
      .where({
        _openID
      })
  })
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}