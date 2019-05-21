// miniprogram/pages/collection/uploadImg/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      img: ''
    }
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
  /**
   * 选择图片
   */
  selectImg() {
    let _this = this
    wx.chooseImage({
      count: 1,
      success(res) {
        console.log(res)
        if (res.tempFiles[0].size < 1024 * 1024) {
          _this.setData({
            'form.img': res.tempFiles[0].path
          })
        } else {
          wx.showToast({
            image: '/static/icon/warning.png',
            title: '所选图片太大',
          })
        }
      }
    })
  },
  submit() {
    let img = this.data.form.img
    if (img === '') {
      wx.showToast({
        title: '请上传封面图',
        icon: 'none'
      })
      return
    }
    let cloudPath = 'works/works-' + new Date().getTime() + img.match(/\.[^.]+?$/)[0]
    wx.showLoading({
      title: '上传中...',
    })
    wx.cloud.uploadFile({
      cloudPath,
      filePath: img,
      success: res => {
        console.log('上传成功' + JSON.stringify(res))
        wx.cloud.callFunction({
          name: 'createWork',
          data: {
            img: res.fileID,
            userID: JSON.parse(wx.getStorageSync('userInfo'))._id
          }
        })
          .then(res => {
            console.log(res)
            wx.hideLoading()
            wx.showToast({
              title: '上传成功',
              success: () => {
                wx.navigateBack({
                  delta:1
                })
              }
            })
          })
          .catch(error => {
            console.log(error)
            // 上传接口请求失败
            wx.showToast({
              title: '上传失败',
              image: '/static/icon/error.png'
            })
          })
      },
      fail: () => {
        // 图片上传失败
        wx.hideLoading()
        wx.showToast({
          title: '上传失败',
          image: '/static/icon/error.png'
        })
      }
    })
  }
})