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
    paginationStatus: {
      visible: false,
      text: '加载中'
    },
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
    this.getFindList('REFRESH')
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
        'pagination.page': 1,
        'paginationStatus.visible': false,
        'paginationStatus.text': '加载中'
      })
    }else{
      this.setData({
        'pagination.page': page + 1,
        'paginationStatus.visible': true
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
          if (type === 'REFRESH'){
            this.setData({
              itemList: res.result.list.data,
              'pagination.total': res.result.pagination.total,
              'pagination.totalPage': res.result.pagination.totalPage,
            })
          }else{
            let oldItemList = this.data.itemList
            setTimeout(()=>{
              this.setData({
                itemList: oldItemList.concat(res.result.list.data),
                'pagination.total': res.result.pagination.total,
                'pagination.totalPage': res.result.pagination.totalPage,
                'paginationStatus.visible': false
              })
            },500)
          }
        })
        .catch(err => {
          this.setData({
            'paginationStatus.visible': false
          })
        })
    } else {
      this.setData({
        'paginationStatus.visible': true,
        'paginationStatus.text': '没有更多了',
      })
    }
  }
})