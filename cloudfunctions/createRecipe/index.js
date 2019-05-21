// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    let addResult = await db.collection('recipe').add({
      data: {
        title: event.title,
        img: event.img,
        des: event.des,
        level: event.level,
        cuisine: event.cuisine,
        efficacy: event.efficacy,
        userID: event.userID
      } 
    })
    return await db.collection('collection-repice').add({
      data: {
        createTime: new Date(),
        recipeID: addResult._id,
        userID: event.userID
      }
    })
  } catch (e) {
    console.log(e)
  }
}