//index.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    logged: false,
  },

  onLoad: function() {
    wx.getSetting({
      success(res){
        console.log(res)
        if(!res.authSetting["scope.userInfo"]){
          wx.authorize({
            scope: 'scope.userInfo',
            success(){
              wx.getUserInfo({
                success(res){
                  console.log(res)
                }
              })
            }
          })
        }
      }
    })
  },

})