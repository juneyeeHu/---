// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: "", // 账号
    password: "", // 密码
  },

  register: function() {
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
        })
    } else if (this.data.password.length == 0) {
        wx.showToast({
            title: '密码不能为空',
            icon: 'error',
            duration: 1000 // 弹窗时间为1秒
        });
    } else if (this.data.password.length > 16) {
        wx.showToast({
            title: '密码应在16位之内',
            icon: 'error',
            duration: 1000
        })
    } else {
        console.log(this.data.user)
        console.log(this.data.password)
        wx.request({
            url: 'https://www.aiguider666.asia/register',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 确保内容类型为表单格式
            },
            data: {
                user_id: this.data.user,
                password: this.data.password
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    wx.showToast({
                        title: '注册成功',
                        icon: 'success',
                        duration: 1000
                    })
                    setTimeout(function() {
                        wx.redirectTo({
                            url: '/pages/login/login',
                        });
                    }, 1000);
                } else {
                    wx.showToast({
                        title: "手机号已被注册",
                        icon: 'error',
                        duration: 1000
                    })
                    console.log(res)
                }
            },
            fail: function(err) {
                wx.showToast({
                    title: "请求失败",
                    icon: 'error',
                    duration: 1000
                })
                console.log(err)
            }
        })
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
      url: '/pages/login/login',
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