// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    // 查询符合条件的记录总数
    let count = await db.collection('collection-works')
      .where({
        userID: event.userID
      })
      .count()
    // 查询当前页的记录
    let list = await db.collection('collection-works')
      .where({
        userID: event.userID
      })
      .skip((event.page - 1) * event.pageSize)
      .limit(event.pageSize)
      .orderBy('createTime', 'asc')
      .get()
    // 返回数据
    return {
      list,
      pagination: {
        totalPage: Math.ceil(count.total / event.pageSize)
      }
    }
  } catch (e) {
    console.log(e)
  }
}