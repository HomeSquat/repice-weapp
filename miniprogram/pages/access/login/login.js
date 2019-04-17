// miniprogram/pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  getUserInfoBack(res) {
    console.log(res)
    wx.cloud.callFunction({
        name: "login",
        data: {
          nickName: res.detail.userInfo.nickName,
          avatarUrl: res.detail.userInfo.avatarUrl
        }
      })
      .then(res => {
        console.log(res)
        let data = res.result.data[0]
        let userInfo = {
          _id: data._id,
          _openId: data._openId,
          nickName: data.nickName,
          avatarUrl: data.avatarUrl
        }
        wx.setStorageSync('isLogin', true)
        wx.setStorageSync('userInfo', JSON.stringify(userInfo))
        wx.switchTab({
          url: "/pages/find/index/index",
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
})