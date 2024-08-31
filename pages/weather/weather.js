// pages/weather/weather.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:'未知',
    district:'wz',
    time:'2024-01-01',
    temp:'00',
    tianqi:'wz',
    fengxiang:'zw',
    dengji:'2',
    humidity:'23',
    icon:'999',
    jiangshui:'wz',
    yundong:'wz',
    chuanyi:'zz',
    pa:'1211',
    ziwaixian:'333',
    see:'234',
    advice1:'',
    advice2:''
  },
  getWeather(e){
    let that=this
    wx.getLocation({
        type: 'wgs84',
        success (res) {
         console.log(res);
          const latitude = res.latitude
          const longitude = res.longitude
          const key='db0386a537ac4e88967a11577cab15cd'
          wx.request({
            url:`https://geoapi.qweather.com/v2/city/lookup?location=${longitude},${latitude}&key=${key}`,
            success(res){
                console.log(res.data)
                console.log(res.data.location[0].adm1);//市
                console.log(res.data.location[0].name);//qu
                that.setData({
                  city:res.data.location[0].adm1,
                  district:res.data.location[0].name
                })
                wx.request({
                  url: `https://devapi.qweather.com/v7/weather/now?location=${longitude},${latitude}&key=${key}`,
                  success(res){
                      console.log(res.data.now);
                      that.setData({
                        icon:res.data.now.icon,
                        tianqi:res.data.now.text,
                        temp:res.data.now.temp,
                        fengxiang:res.data.now.windDir,//fengxiang 
                        dengji:res.data.now.windScale,
                        humidity:res.data.now.humidity,
                        pa:res.data.now.pressure,
                        see:res.data.now.vis,
                        jiangshui:res.data.now.precip,
                        time:res.data.updateTime.slice(11,16)                         
                      })
                      wx.request({
                        url:`https://devapi.qweather.com/v7/indices/1d?type=1,2,3,4,5&location=${longitude},${latitude}&key=${key}`,
                        success(res){
                            console.log(res.data);
                            that.setData({
                              ziwaixian:res.data.daily[4].category,
                                yundong:res.data.daily[0].category,
                                chuanyi:res.data.daily[2].category,
                                advice1:res.data.daily[2].text,
                                advice2:res.data.daily[4].text
                              })
                        }
                      })
                  }
                })
            }
            
          })
        },

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getWeather();
    console.log("执行");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: '天气情况'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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