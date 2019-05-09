// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    let cuisineList = await db.collection('cuisine').orderBy('type','asc').get()
    // 查询符合条件的记录总数
    let count = await db.collection('collection-repice')
      .where({
        userID: event.userID
      })
      .count()
    // 查询当前页数的记录
    let list = await db.collection('collection-repice')
      .where({
        userID: event.userID
      })
      .skip((event.page - 1) * event.pageSize)
      .limit(event.pageSize)
      .orderBy('createTime', 'asc')
      .get()
    // 对查找出来的列表进行格式处理
    let listTemp = []
    for (let i = 0; i < list.data.length; i++) {
      // 根据食谱ID找到食谱信息
      let recipeInfo = await db.collection('recipe').doc(list.data[i].recipeID).get()
      // 根据作者ID找到用户信息
      let author = await db.collection('user').doc(recipeInfo.data.userID).field({
        _id: false,
        avatarUrl: true,
        nickName: true
      }).get()
      listTemp.push({
        id: list.data[i]._id, // 收藏id
        title: recipeInfo.data.title, // 食谱名称
        img: recipeInfo.data.img, // 食谱主图
        cuisine: cuisineList.data[recipeInfo.data.cuisine - 1].label, // 食谱所属菜系
        des: recipeInfo.data.des, // 食谱描述
        level: recipeInfo.data.level, // 食谱难度
        efficacy: recipeInfo.data.efficacy, // 食谱功效
        author: author.data // 食谱作者
      })
    }
    // 返回数据
    return {
      list: listTemp,
      pagination: {
        totalPage: Math.ceil(count.total / event.pageSize)
      }
    }
  } catch (e) {
    console.log(e)
  }
}