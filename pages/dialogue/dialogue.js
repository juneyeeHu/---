
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import Dialog from '@vant/weapp/dialog/dialog';
// pages/dialogue/dialogue.js

let recorderManager = wx.getRecorderManager();
let isRecording2 = false;
let options = {
  duration: 60000,
  sampleRate: 16000,
  numberOfChannels: 1,
  encodeBitRate: 48000,
  format: 'pcm',
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: "",

    user_img: "/images/tabBar/user.jpg",
    ai_img: "/images/tabBar/keft.png",
    msg: "", //输入框输入

    isImage: 0,
    tempImagePath: "", //暂存的图片的路径

    // 0 img
    // 1 text
    // 2 video
    dialogue: [
      {"flag": 0, "type":1 ,"content": "欢迎使用晓泉，请输入文字或上传图片，晓泉会为您解答您的问题的！"},
    ],

    scroll_top:30+"vh",
    heightScale:{ maxHeight: 200, minHeight: 0 },

    isRecording: false, // 是否正在录音
    recordingTipVisible: false,
    token: "", // 语音识别的token
    tempVoicePath: "", // 录音文件临时保存地址
    VoiceLength: 0, // 录音文件的长度

    test: "", // 暂时测试用的
    
    keyboardHeight: 0,
  },

  // 绑定输入事件
  bindInput: function(e) {
    this.setData({
      msg: e.detail.value
    });
  },

  //点击发送按钮发送信息
  sendMsg:function(){
    console.log(this.data.tempImagePath)
    if(this.data.msg.length==0){ //如果啥也没写
      Notify({ type: 'success', message: '输入内容不能为空' });
    }else{  //有有效信息
      if(this.data.tempImagePath.length > 0 ) {
        // 如果有图片
        this.data.dialogue.push({"flag": 1, "type": "0", "content": this.data.msg, "url": this.data.tempImagePath})
      }
      else {
        this.data.dialogue.push({"flag": 1, "type":"1", "content": this.data.msg})
      }

      this.Process()

      this.setData({
        tempImagePath: "",
        isImage: 0,
      })
      
      var len = this.data.dialogue.length //遍历的数组的长度
      this.setData({
        dialogue: this.data.dialogue,
        scroll_top: 1000 * len,
        msg:""
      })
    }
  },

  //点击图片图标
  open_camera: function() {  
    var _this = this;
    wx.chooseImage({  
      count: 1, // 默认9，这里设置为1表示只选一张图片  
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], 
      success: function (res) {  
        const tempFilePaths = res.tempFilePaths;  
        
        console.log(tempFilePaths);  
  
        _this.setData({
          tempImagePath: res.tempFilePaths,
          isImage: 1
        });
      },  
      fail: function(err) {  
        console.error(err);  
      }  
    });  
  },

  // 长按录音
  startRecord: function(event) {
    this.setData({
      isRecording: true,
      recordingTipVisible: true // 显示录音提示框
    });
    isRecording2 = true;
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log("Start Recording!")
    })
  },

  // 停止录音
  stopRecord: function() {
    this.setData({
      isRecording: false,
      recordingTipVisible: false
    });
    recorderManager.stop();
    recorderManager.onStop((res) => {
      console.log("End Recording!")
      this.setData({
        tempVoicePath: res.tempFilePath
      });
      // 获取语音文件的长度
      wx.getFileInfo({
        filePath: this.data.tempVoicePath,
        success: (res) => {
            this.setData({
                VoiceLength: res.size
            })
            console.log("length", res.size)
            this.Recognize();
        },
        fail: (error) => {
          console.log("fail", error)
        }
    })
})
  },

// 获取语音识别
Recognize: function() {
  console.log("filePath: ", this.data.tempVoicePath)
  console.log("token:", this.data.token)
  console.log("VoiceLength", this.data.VoiceLength)
  wx.getFileSystemManager().readFile({
      filePath: this.data.tempVoicePath,
      encoding: 'base64',
      success: (res) => {
          wx.request({
              url: 'http://vop.baidu.com/server_api',
              data: {
                  token: this.data.token,
                  cuid: "zhaoxuhuihuixuzhao",
                  format: "pcm",
                  rate: 16000,
                  channel: 1,
                  speech: res.data,
                  len: this.data.VoiceLength
              },
              headers: {
                  'Content-Type': 'application/json'
              },
              method: "POST",
              success: (res) => {
                  if (res.data.result == '') {
                      console.log("error", res)
                      wx.showToast({
                        title: "语音识别失败",
                        icon: "error",
                        duration: 1000
                      })
                  } else {
                      console.log("test", res.data)
                      this.setData({
                          msg: res.data.result
                      })
                  }
              },
              fail: (res) => {
                  console.log("error", res)
                  wx.showToast({
                    title: "语音识别失败",
                    icon: "error",
                    duration: 1000
                  })
              }
          })
      }
  })
},

// 获取token
getToken: function() {
  let Apikey = "lKOvybBw5t6ecb4ywhLOEAOB";
  let SecretKey = "242NgTXYkxK2ij0ParTaI37ifkO8OAm4";
  const url = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + Apikey + '&client_secret=' + SecretKey;
  wx.request({
      url: url,
      method: 'POST',
      success: (res) => {
          console.log("access_token", res)
          this.setData({
              token: res.data.access_token
          })
      }
  })
},

/*取消上传图片*/
cancelImage: function() {
  this.setData({
    tempImagePath: "",
    isImage: 0,
  })
},

/*与后端大模型进行交互*/
Process: function() {
  const _this = this;

  // 检查数据有效性
  if (!this.data.msg && !this.data.tempImagePath) {
    console.log("Invalid data");
    return;
  }

  if (this.data.tempImagePath) {
    // 如果有图片，使用 wx.uploadFile
    console.log("Uploading file from path:", this.data.tempImagePath[0]); // 打印文件路径

    wx.uploadFile({
      url: 'https://www.aiguider666.asia/qanda', // 后端服务器地址
      filePath: this.data.tempImagePath[0], // 确保这是一个字符串
      name: 'image', // 与后端字段名一致
      formData: {
        text: this.data.msg,
        temperature: '0.8',
        top_p: '0.4',
        user_id: this.data.user
      },
      success: (res) => {
        try {
          const data = JSON.parse(res.data); // 确保解析响应数据
          if (data.result != '') {
            _this.setData({
              dialogue: _this.data.dialogue.concat({"flag": 0, "type": "1", "content": data.result })
            });
            var len = this.data.dialogue.length //遍历的数组的长度
            this.setData({
              dialogue: this.data.dialogue,
              scroll_top: 1000 * len,
            })
          } else {
            console.log("Error", data);
          }
        } catch (e) {
          console.log("Response parse error", e);
        }
      },
      fail: (err) => {
        console.log("Internet error", err);
      }
    });
  } else {
    // 如果没有图片，使用 wx.request
    wx.request({
      url: 'https://www.aiguider666.asia/qanda', // 后端服务器地址
      method: 'POST',
      data: {
        user_id: this.data.user,
        text: this.data.msg,
        temperature: '0.8',
        top_p: '0.4'
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' // 确保发送正确的内容类型
      },
      success: (res) => {
        if (res.data.result != '') {
          _this.setData({
            dialogue: _this.data.dialogue.concat({"flag": 0, "type": "1", "content": res.data.result })
          });
    var len = this.data.dialogue.length //遍历的数组的长度
      this.setData({
        dialogue: this.data.dialogue,
        scroll_top: 1000 * len,
        msg:""
      })
        } else {
          console.log("Error", res.data);
        }
      },
      fail: (err) => {
        console.log("Internet error", err);
      }
    });
  }
},

/**查看历史记录 */
history: function() {
  wx.navigateTo({
    url: '/pages/logs/logs?userId=' + this.data.user,
  })
},



/**
* 生命周期函数--监听页面加载
*/
onLoad(options) {
  console.log(options.user)
  this.setData({
    user: options.user
  })
  // 监听录音开始事件
  this.getToken();

/**键盘升起 */
wx.onKeyboardHeightChange(res => {

  this.setData({

    KeyboardHeight : res.height

  })

})
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