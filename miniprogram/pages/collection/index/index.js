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
        name: '作品',
        pagination: {
          page: 1,
          pageSize: 15,
          total: 1,
          totalPage: 2
        },
      }
    ],
    paginationStatus: {
      visible: false,
      text: '加载中'
    },
    recipeList: [],
    workList: []
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
      this.getCollectionWorkList(1)
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
   * 获取自己的作品图片
   */
  getCollectionWorkList(page) {
    if(page <= this.data.tabs[1].pagination.totalPage){
      wx.cloud.callFunction({
        name: 'getCollectionWork',
        data: {
          userID: JSON.parse(wx.getStorageSync('userInfo'))._id,
          page,
          pageSize: this.data.tabs[1].pagination.pageSize
        }
      })
        .then(res => {
          console.log(res)
          let oldWorkList = this.data.workList
          setTimeout(() => {
            this.setData({
              'tabs[0].pagination.totalPage': res.result.pagination.totalPage,
              'paginationStatus.visible': false,
              workList: oldWorkList.concat(res.result.list.data)
            })
          }, 500)
        })
        .catch(err => {
          this.setData({
            'paginationStatus.visible': false
          })
        })
    }else{
      this.setData({
        'paginationStatus.visible': true,
        'paginationStatus.text': '没有更多了',
      })
    }
    
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
  gotoPage(e) {
    console.log(e)
    if (this.data.currentIndex === '0') {
      wx.navigateTo({
        url: '/pages/collection/upload/index'
      })
    } else {
      console.log('上传照片')
      wx.navigateTo({
        url: '/pages/collection/uploadImg/index'
      })
    }
  },
  /**
   * 查看自己的作品图片
   */
  showImg(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.imgUrl, // 当前显示图片的http链接
      urls: this.data.workList.map(item => {
        return item.imgUrl
      }) // 需要预览的图片http链接列表
    })
  },
  scrollTolower() {
    let page = this.data.tabs[1].pagination.page
    this.setData({
      'tabs[1].pagination.page': page + 1,
      'paginationStatus.visible': true
    })
    this.getCollectionWorkList(page + 1)
  }
})