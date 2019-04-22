/**
 * miniprogram/pages/find/index/index.js
 * @author 东东 <coder_dong@qq.com>
 * @timer 2019-04-22
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagination: {
      page: 1,
      pageSize: 4,
      total: 1,
      totalPage: 2
    },
    isShow: true,
    itemList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
      this.getFindList('REFRESH')
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
    console.log("下拉刷新")
    this.getFindList('REFRESH')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("上拉加载")
    this.getFindList('LOAD')
  },
  /**
   * 获取发现列表
   * @params type {String} REFRESH: 刷新，LOAD：上拉加载
   */
  getFindList(type) {
    let page = this.data.pagination.page
    if (type === 'REFRESH') {
      this.setData({
        'pagination.page': 1
      })
    }else{
      this.setData({
        'pagination.page': page + 1
      })
    }
    if (this.data.pagination.page <= this.data.pagination.totalPage) {
      wx.cloud.callFunction({
          name: "getFindList",
          data: {
            page: this.data.pagination.page,
            pageSize: this.data.pagination.pageSize
          }
        })
        .then(res => {
          console.log(res)
          let oldItemList = this.data.itemList
          this.setData({
            itemList: type === 'REFRESH' ? res.result.list.data : oldItemList.concat(res.result.list.data),
            'pagination.total': res.result.pagination.total,
            'pagination.totalPage': res.result.pagination.totalPage
          })
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      console.log("没有更多内容了")
    }
  }
})