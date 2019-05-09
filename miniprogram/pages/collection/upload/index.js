// miniprogram/pages/collection/upload/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typePicker: false, // 菜单类型picker
    form: {
      title: '',
      cuisine: 0,
      typeLabel: '请选择菜谱类型',
      efficacy: '',
      level: 1,
      img: '',
      des: ''
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
  submit() {
    let title = this.data.form.title,
      cuisine = this.data.form.cuisine,
      img = this.data.form.img,
      des = this.data.form.des
    if (title === '') {
      wx.showToast({
        title: '请填写名称',
        icon: 'none'
      })
      return
    }
    if (cuisine === 0) {
      wx.showToast({
        title: '请选择类型',
        icon: 'none'
      })
      return
    }
    if (img === '') {
      wx.showToast({
        title: '请上传封面图',
        icon: 'none'
      })
      return
    }
    if (des === '') {
      wx.showToast({
        title: '请简短描述菜谱',
        icon: 'none'
      })
      return
    }
    let cloudPath = 'recipe/recipe-' + new Date().getTime() + img.match(/\.[^.]+?$/)[0]
    wx.showLoading({
      title: '上传中...',
    })
    wx.cloud.uploadFile({
      cloudPath,
      filePath: img,
      success: res => {
        console.log('上传成功' + JSON.stringify(res))
        wx.cloud.callFunction({
            name: 'createRecipe',
            data: {
              title,
              cuisine,
              img: res.fileID,
              level: this.data.form.level,
              efficacy: this.data.form.efficacy,
              des,
              userID: JSON.parse(wx.getStorageSync('userInfo'))._id
            }
          })
          .then(res => {
            console.log(res)
            wx.hideLoading()
            wx.showToast({
              title: '上传成功',
              success: () => {
                wx.navigateTo({
                  url: '/pages/collection/index/index',
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
  },
  /**
   * 显示picker
   */
  showPicker() {
    this.setData({
      typePicker: true
    })
  },
  /**
   * 关闭菜谱类型picker
   */
  closeTypePicker() {
    this.setData({
      typePicker: false
    })
  },
  /**
   * 选择菜谱类型
   */
  changeType(e) {
    this.setData({
      'form.cuisine': e.detail.type,
      'form.typeLabel': e.detail.label,
      typePicker: false
    })
  },
  /**
   * 选择难度
   */
  changeLevel(e) {
    this.setData({
      'form.level': e.detail.index
    })
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
  /**
   * 输入名称
   */
  inputTitle(e) {
    this.setData({
      'form.title': e.detail.value
    })
  },
  /**
   * 输入菜谱功效
   */
  inputEfficacy(e) {
    this.setData({
      'form.efficacy': e.detail.value
    })
  },
  /**
   * 输入描述
   */
  inputDes(e) {
    this.setData({
      'form.des': e.detail.value
    })
  }
})