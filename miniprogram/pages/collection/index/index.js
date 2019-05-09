// miniprogram/pages/collection/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentHeight: '0px',
    currentIndex: '0',
    currentItem: 0,
    tabs: [{
        index: '0',
        name: '食谱',
        pagination: {
          page: 1,
          pageSize: 4,
          total: 1,
          totalPage: 2
        },
      },
      {
        index: '1',
        name: '作品'
      }
    ],
    recipeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getContentHeight()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    if (!wx.getStorageSync("isLogin")) {
      wx.reLaunch({
        url: "/pages/access/login/login",
      })
    } else {
      this.getCollectionRepiceList(1)
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },
  /**
   * 获取收藏的食谱列表
   */
  getCollectionRepiceList(page) {
    wx.cloud.callFunction({
      name: 'getCollectionRepice',
      data: {
        userID: JSON.parse(wx.getStorageSync('userInfo'))._id,
        page,
        pageSize: this.data.tabs[0].pagination.pageSize
      }
    }).then(res => {
      let oldRecipeList = this.data.recipeList
      this.setData({
        'tabs[0].pagination.totalPage': res.result.pagination.totalPage,
        recipeList: oldRecipeList.concat(res.result.list)
      })
    })
  },
  /**
   * 切换当前tab
   */
  changeCurrentIndex(e) {
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
    query.exec(function(res) {
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
  changeItem(e) {
    this.setData({
      currentItem: parseInt(e.detail.currentItemId)
    })
    this.getData(e)
  },
  getData(e) {
    let page = this.data.tabs[0].pagination.page
    let pageSize = this.data.tabs[0].pagination.pageSize
    if ((e.detail.current === page * pageSize - 3) && page <= this.data.tabs[0].pagination.totalPage) {
      this.getCollectionRepiceList(page + 1)
      this.setData({
        'tabs[0].pagination.page': page + 1
      })
    }
  },
  gotoPage(e){
    console.log(e)
    if(e.currentTarget.dataset.page === 'upload'){
      wx.navigateTo({
        url: '/pages/collection/upload/index'
      })
    }
  }
})