Page({
  data: {
    textAnimation: {},
    imageAnimation1: {},
    imageAnimation2: {},
    summary: '',
    user: "", // 用户信息
  },

  onLoad: function(options) {
    console.log(options.userId)
    this.setData({
      user: options.userId
    })
    this.createAnimations();
    this.getSummary();
  },

  createAnimations: function() {
    this.textAnimation = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease'
    });

    this.imageAnimation1 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    });

    this.imageAnimation2 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    });
  },
  getSummary() {
    let _this = this
    wx.request({
      url: 'https://www.aiguider666.asia/get_summery', 
      data: {
        user_id: _this.data.user
      },
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({
            summary: res.data.result,
          });
          this.animateText();
        } else {
          console.error('Error:', res);
        }
      },
      fail: (err) => {
        console.error('Request failed', err);
      },
    });
  },
  animateText() {
    this.textAnimation.opacity(1).step();  // 出现动画
    this.textAnimation.opacity(1).step({ duration: 4000 });  // 停留 2 秒
    this.textAnimation.opacity(0).step();  // 消失动画

    this.setData({
      animationData: this.textAnimation.export()
    });
  },

  startAnimation: function() {
    // Text animation
    this.textAnimation.opacity(1).translateY(-50).step();
    this.setData({
      textAnimation: this.textAnimation.export()
    });

    // Image animations
    this.imageAnimation1.opacity(1).scale(1.5).step();
    this.setData({
      imageAnimation1: this.imageAnimation1.export()
    });

    this.imageAnimation2.opacity(1).rotate(360).step();
    this.setData({
      imageAnimation2: this.imageAnimation2.export()
    });

    // Reset animations
    setTimeout(() => {
      this.textAnimation.opacity(0).translateY(50).step();
      this.setData({
        textAnimation: this.textAnimation.export()
      });

      this.imageAnimation1.opacity(0).scale(1).step();
      this.setData({
        imageAnimation1: this.imageAnimation1.export()
      });

      this.imageAnimation2.opacity(0).rotate(0).step();
      this.setData({
        imageAnimation2: this.imageAnimation2.export()
      });
    }, 2000);
  }
});




// import animationData from '动态背景.json';

// Page({
//   data: {
//     animationData: null,
//   },
//   onLoad() {
//     this.setData({
//       animationData,
//     });
//   },
// });
