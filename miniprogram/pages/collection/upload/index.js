// miniprogram/pages/collection/upload/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typePicker: false, // 菜单类型picker
    form: {
      name: '',
      type: 0,
      typeLabel: '请选择菜谱类型',
      level: 1,
      img: '',
      des: ''
    }
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
   * 显示picker
   */
  showPicker(){
    this.setData({
      typePicker: true
    })
  },
  /**
   * 关闭菜谱类型picker
   */
  closeTypePicker(){
    this.setData({
      typePicker: false
    })
  },
  /**
   * 选择菜谱类型
   */
  changeType(e){
    this.setData({
      'form.type': e.detail.type,
      'form.typeLabel': e.detail.label,
      typePicker: false
    })
  },
  /**
   * 选择难度
   */
  changeLevel(e){
    this.setData({
      'form.level': e.detail.index
    })
  },
  selectImg(){
    let _this = this
    wx.chooseImage({
      count: 1,
      success(res){
        console.log(res)
        if(res.tempFiles[0].size < 1024 * 1024){
          _this.setData({
            'form.img': res.tempFiles[0].path
          })
        }else{
          wx.showToast({
            image: '/static/icon/warning.png',
            title: '所选图片太大',
          })
        }
      }
    })
  }
})