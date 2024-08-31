// pages/map/map.js
const config = require('../../resources/config.js');  //获取config配置
const app = getApp();  //获取全局的app对象
var QQMapWX = require('../../resources/qqmap-sdk/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'EH2BZ-USOKI-U5OGY-ULBEN-DJQUO-TAFFF' // 必填
});

Page({
  data: {
    defaultLongitude: config.center_longitude,
    defaultLatitude: config.center_latitude,
    defaultScale:config.default_scale,
    minScale:config.min_scale,
    maxScale:config.max_scale,
    windowHeight: 600,
    mapSubKey:config.mapSubKey,
    popup:{
      popupShow:false,
      detail:false,
      title:"",
      longitude:"",
      latitude:"",
      src:"/images/view_pic/趵突泉公园.jpg",
      dis:"",
      description:"趵突泉公园位于济南市中心繁华地段，是国家AAAAA级旅游景区，南倚千佛山，北靠大明湖，东与泉城广场连接，是以泉水、人文景观为主的文化名园。1956年，趵突泉被整修辟为公园，历经几次扩建，逐渐建成以泉为主、小巧玲珑、步移景异的泉石园，面积从不足3.4公顷，扩至10.5公顷。趵突泉又名槛泉，为泺水之源，至今已有二千七百年的历史。趵突泉，三窟并发，声如隐雷，\"泉源上奋，水涌若轮\"。泉水一年四季恒定在摄氏18度左右。严冬，水面上水气袅袅，像一层薄薄的烟雾，一边是泉池幽深波光粼粼;一边是楼阁彩绘，雕梁画栋，构成了一幅奇妙的人间仙境。"
    },
    stores:[
      {
        id:0,
        latitude:config.center_latitude,
        longitude:config.center_longitude,
        iconPath:'/resources/img/location.png',
        width:'81rpx',
        height:'72.9rpx'
      },
      {
        id:1,
        latitude:36.66145880432566,
        longitude:117.0166745711415,
        iconPath:'/resources/img/point.png',
        width:'81rpx',
        height:'72.9rpx'
      },
    ],
    current: {
      src: '',
      played:false,
      progress:0,
      audioCtx: null
    },
  },

  goToWeatherPage: function () {
        wx.navigateTo({
          url: '/pages/weather/weather'
        });
      },
    
  //生命周期函数--监听页面加载
  onLoad(options) {
    wx.showLoading({
      title: '数据加载中...',
    })
    this.setData({
      windowHeight: app.globalData.windowHeight,
      "stores[1].latitude":options.latitude,
      "stores[1].longitude":options.longitude,
    }, () => {
      wx.hideLoading();
    })
    this.getTargetLocation();
    // 获取audio上下文  
    const audioCtx = wx.createInnerAudioContext();  
    audioCtx.src = this.data.current.src;  
    audioCtx.onTimeUpdate(()=> { 
      var pro = Math.round((this.data.current.audioCtx.currentTime/this.data.current.audioCtx.duration)*100)
      if(pro==100){
        pro = 0
        this.setData({
          "current.played":false
        })
      }
      this.setData({
        "current.progress":pro
      })
      console.log(pro)
    })
    this.setData({  
      current: {  
        ...this.data.current,  
        audioCtx  
      }  
    });  
  },

  onUnload(){
    this.pauseAudio()
  },

  //针对poi点击后的回调函数
  poiTap:function(event){
    // 获取景点介绍
    var _this = this
    wx.request({
      url: 'https://www.aiguider666.asia/getSpotDetails', 
      data: {
        name:event.detail.name
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        // 填入数据
        if(res.data["error"]!=null){
          _this.setData({
            "popup.title":"603",
            "popup.description":"洞天福地",
          })
        }else{
          _this.setData({
            "popup.title":event.detail.name,
            "popup.latitude":event.detail.latitude,
            "popup.longitude":event.detail.longitude,
            "popup.description":res.data["description"],
            "popup.src":res.data["imageUrls"][0],
          })
        }
        
      },
      
    })

    //获取音频地址
    wx.request({
      url: 'https://www.aiguider666.asia/getAudio', 
      data: {
        latitude:event.detail.latitude,
        longitude:event.detail.longitude
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
        success (res) {
          console.log(res.data.audioUrl)
          // 填入数据
          if(res.data["error"]!=null){
            _this.setData({
              "current.src":'/resources/167637809.mp3',
              "current.played":false,
              "current.progress":0,
            })
          }else{
            _this.setData({
              "current.src":res.data.audioUrl,
              "current.played":false,
              "current.progress":0,
            })
            //根据data更改url
            const currentAudio = _this.data.current.audioCtx;
            currentAudio.src = _this.data.current.src; 
            _this.getDistance()
          } 
        }
        
    })

    //调试：输出经纬度,详情
    console.log(event.detail.longitude,event.detail.latitude)
  },

  //关闭poiTap
  popupOnClose:function(){
    this.setData({
      "popup.popupShow":false,
      "popup.detail":false,
      "current.played":false,
    })
    const currentAudio = this.data.current.audioCtx;  
    currentAudio.pause()
  },

  //poiTap中计算距离用
  getDistance(){
      var _this = this
      wx.request({
        url: 'https://apis.map.qq.com/ws/distance/v1/matrix?mode=walking', 
        data: {
          "key":"EH2BZ-USOKI-U5OGY-ULBEN-DJQUO-TAFFF",
          "from":this.data.defaultLatitude+","+this.data.defaultLongitude,
          "to":this.data.popup.latitude+","+this.data.popup.longitude
        },
        header: {
          'content-type': 'application/json' 
        },
        success (res) {
          _this.setData({
            "popup.dis":res.data.result.rows[0].elements[0].distance,
            "popup.popupShow":true,
          })
        },
      })
      
  },

  //去这里:导航插件
  popupButtonClick:function(){
    this.pauseAudio()
    this.setData({
      "popup.popupShow":false,
      "popup.detail": false
    })
    let mode = "walking";
    let key = config.mapSubKey;  //使用在腾讯位置服务申请的key
    let referer = '泉哥带路';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
        'name': this.data.popup.title,
        'latitude':this.data.popup.latitude,
        'longitude':this.data.popup.longitude
    });
    let startPoint = JSON.stringify({  //起点
      'name': "我所在的位置",
      'latitude':config.center_latitude,
      'longitude':config.center_longitude
  });
    wx.navigateTo({
        url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer 
        + '&endPoint=' + endPoint + '&startPoint=' + startPoint + '&mode=' + mode 
    });
  },

  //详情:详情页面
  popupButtonClick2:function(){
      this.setData({
        "popup.detail":true
      })
  },

  //跳转到对话页面
  toQuan:function(){
    wx.navigateTo({
      url: '../dialogue/dialogue',
      fail:function(res){
        console.log(res)
      }
    })
  },

  //回到我的位置
  getMyLocation:function(){
    let mpCtx = wx.createMapContext("myMap");
    mpCtx.moveToLocation({ latitude: config.center_latitude,
                          longitude:config.center_longitude});
  },

  //回到目标景点位置
  getTargetLocation:function(){
    var _this = this;
    let mpCtx = wx.createMapContext("myMap");
    mpCtx.moveToLocation({ latitude: _this.data.stores[1].latitude,
                          longitude:_this.data.stores[1].longitude});
  },

  // 点击播放
  playAudio: function () {
    const currentAudio = this.data.current.audioCtx;  
    currentAudio.play()
    this.setData({
      "current.played":true,
    });
    setTimeout(() => {
      console.log(currentAudio.paused)
    }, 100)
  },

  // 点击暂停
  pauseAudio: function () {
    const currentAudio = this.data.current.audioCtx;  
    currentAudio.pause()
    this.setData({
      "current.played":false,
    });
  },

  //快进
  propp:function(){
    const current = this.data.current;  
    if (current.audioCtx && current.src) {  
      if (current.audioCtx.paused) {  
        current.audioCtx.play();  
      }  
      // 快进5秒  
      var newProgress = current.progress + 5;  
      if (newProgress < 100) {  
        current.audioCtx.currentTime = newProgress/100*current.audioCtx.duration;  
      } else {  
        // 如果快退后时长小于零，则重置为0或进行其他处理  
        newProgress=0
        current.audioCtx.currentTime = newProgress;  
      }  
      console.log(newProgress)
      setTimeout(() => {
        console.log(current.audioCtx.paused)
      }, 100)

      this.setData({  
        current: {  
          ...current,  
          progress: newProgress,
          played:true
        }  
      });  
    }  
  },
  
  //快退
  promm:function(){
    const current = this.data.current;  
    if (current.audioCtx && current.src) {  
      if (current.audioCtx.paused) {  
        current.audioCtx.play();  
      }  
      // 快退5秒  
      var newProgress = current.progress - 5;  
      if (newProgress > 0) {  
        current.audioCtx.currentTime = newProgress/100*current.audioCtx.duration;  
      } else {  
        // 如果快退后时长小于零，则重置为0或进行其他处理  
        newProgress=0
        current.audioCtx.currentTime = newProgress;  
      }  
      console.log(newProgress)
      setTimeout(() => {
        console.log(current.audioCtx.paused)
      }, 100)
      this.setData({  
        current: {  
          ...current,  

          played:true
        }  
      });  
    }  
  }
})