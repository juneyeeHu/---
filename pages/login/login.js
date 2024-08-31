// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: "", // 账号
    password: "", // 密码
    masked_password: "", //显示在屏幕上的****
  },

  login: function() {
    let _this = this
    if (this.data.user.length == 0) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'error',
        duration: 1000 // 弹窗时间为1秒
      });
    } else if (this.data.user.length != 11) {
      wx.showToast({
        title: '手机号不符合格式',
        icon: 'error',
        duration: 1000
      });
    } else if (this.data.password.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'error',
        duration: 1000 // 弹窗时间为1秒
      });
    } else {
      wx.request({
        url: 'https://www.aiguider666.asia/login',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 确保内容类型为表单格式
      },
        data: {
          user_id: this.data.user, // 修改为 user_id
          password: this.data.password
        },
        success: function(res) {
          if (res.data.message === "Login successful") { // 修改判断条件
            wx.showToast({
              title: "登录成功",
              icon: 'success',
              duration: 1000
            });
            console.log(_this.data.user)
            wx.setStorageSync('user', _this.data.user);
            setTimeout(function() {
              wx.redirectTo({
                url: '/pages/main/main',
              });
            }, 1000); 
          } else {
            wx.showToast({
              title: "账号或密码有误",
              icon: "error",
              duration: 1000
            });
          }
        },
        fail: function(err) {
          wx.showToast({
            title: "请求失败",
            icon: "error",
            duration: 1000
          });
        }
      });
    }
  },

  /*输入 */
  InputUser: function(e) {
    this.setData({
      user: e.detail.value
    });
  },
  
  /**输入密码 */
  InputPassword: function(e) {
    this.setData({
      password: e.detail.value
    });
  },

  /**跳转去注册页面*/
  toRegister: function() {
    wx.redirectTo({
      url: '/pages/register/register',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.hideHomeButton();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})