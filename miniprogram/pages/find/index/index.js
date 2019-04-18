// miniprogram/pages/find/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [
      {
        img: "/static/images/0001.jpg",
        title: "油炸鸡腿",
        des: "周氏炸鸡腿，真正外焦里嫩，超级好吃！！",
        user: {
          avatar: "/static/images/0001.jpg",
          name: "打代码的杰丫"
        }
      },
      {
        img: "/static/images/0001.jpg",
        title: "油炸鸡腿",
        des: "周氏炸鸡腿，真正外焦里嫩，超级好吃！！",
        user: {
          avatar: "/static/images/0001.jpg",
          name: "打代码的杰丫"
        }
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      this.getFindList(1)
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  getFindList(page){
    wx.cloud.callFunction({
      name: "getFindList",
      data: {
        page,
        pageSize: 20
      }
    })
    .then(res => {
      this.setData({
        itemList: res.result.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
})