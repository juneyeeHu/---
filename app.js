// app.js
const config = require('/resources/config.js');
App({
  onLaunch() {
    //获取屏幕高度
    let systemInfo = wx.getSystemInfoSync();  
    let windowHeight = systemInfo.windowHeight;
    this.globalData = {windowHeight};
      // 设置不遵循静音开关播放
wx.setInnerAudioOption({
  obeyMuteSwitch: false
})

  }
})
