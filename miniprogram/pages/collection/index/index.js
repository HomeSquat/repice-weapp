// miniprogram/pages/collection/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentHeight: '0px',
    currentIndex: '0',
    currentItem: 1,
    tabs: [
      {
        index: '0',
        name: '食谱'
      },
      {
        index: '1',
        name: '作品'
      }
    ],
    recipeList: [
      {
        id: 1,
        title: '麻辣香锅',
        img: '/static/images/0001.jpg',
        des: '发源于重庆缙云山，由川渝地方麻辣风味融合而来。麻辣香锅源于土家风味，是当地老百姓的家常做法,以麻、辣、鲜、香、油、混搭为特点。虽然麻辣香锅属于麻辣口味，但颇受全国食客喜爱。',
        cuisine: '川菜',
        efficacy: '活血化瘀，驱寒除湿',
        level: 3,
        user: {
          nickName: '东东',
          avatarUrl: '/static/images/0001.jpg'
        }
      },
      {
        id: 2,
        title: '第二个',
        img: '/static/images/0002.jpg',
        des: '发源于重庆缙云山，由川渝地方麻辣风味融合而来。 麻辣香锅源于土家风味，是当地老百姓的家常做法, 以麻、辣、鲜、香、油、混搭为特',
        cuisine: '川菜',
        efficacy: '活血化瘀，驱寒除湿',
        level: 5,
        user: {
          nickName: '东东',
          avatarUrl: '/static/images/0002.jpg'
        }
      },
      {
        id: 3,
        title: '第三个',
        img: '/static/images/0003.jpg',
        des: '发源于重庆缙云山，由川渝地方麻辣风味融合而来。 麻辣香锅源于土家风味，是当地老百姓的家常做法, 以麻、辣、鲜、香、油、混搭为特',
        cuisine: '川菜',
        efficacy: '活血化瘀，驱寒除湿',
        level: 1,
        user: {
          nickName: '东东',
          avatarUrl: '/static/images/0003.jpg'
        }
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getContentHeight()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (!wx.getStorageSync("isLogin")) {
      wx.reLaunch({
        url: "/pages/access/login/login",
      })
    }else{
      this.getCollectionRepiceList()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**
   * 获取收藏的食谱列表
   */
  getCollectionRepiceList(){
    wx.cloud.callFunction({
      name: 'getCollectionRepice',
      data: {
        openID: JSON.parse(wx.getStorageSync('userInfo'))._openID
      }
    }).then(res => {
      console.log(res)
    })
  },
  /**
   * 切换当前tab
   */
  changeCurrentIndex(e){
    this.setData({
      currentIndex: e.currentTarget.id
    })
  },
  /**
   * 获取内容高度
   */
  getContentHeight() {
    var _this = this;
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#tabs').boundingClientRect()
    query.exec(function (res) {
      //res就是 该元素的信息 数组
      //取高度
      _this.setData({
        contentHeight: wx.getSystemInfoSync().windowHeight - res[0].height + 'px'
      })
    })
  },
  /**
   * 卡片式切换食谱
   */
  changeItem(e){
    this.setData({
      currentItem: parseInt(e.detail.currentItemId)
    })
  }
})