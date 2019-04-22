// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  let index = (event.page - 1) * event.pageSize
  try {
    let count = await db.collection('recipe').count()
    let total = count.total
    let totalPage = Math.ceil(total / event.pageSize)
    let list = await db.collection('recipe')
      .orderBy('create_time', 'asc')
      .skip(index)
      .limit(event.pageSize)
      .get()
    return {
      pagination: {
        total: total,
        totalPage: totalPage
      },
      list: list
    }
  } catch (e) {
    console.log(e)
  }
}