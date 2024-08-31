const config = require('../../resources/config.js');  //获取config配置
var QQMapWX = require('../../resources/qqmap-sdk/qqmap-wx-jssdk.js');
// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    user: "",

  //存放轮播图数据的列表
   swiperlist:[
     {path:"/images/main/swiper_1.jpg"},
     {path:"/images/main/swiper_2.jpg"},
     {path:"/images/main/swiper_3.jpg"},     
],
function_list:[
{ 
  icon:"/images/function-list/文创.svg",
  name:"文创周边",
  url: "/pages/creative_center/creative_center"
},
{
  icon:"/images/function-list/旅游攻略.svg",
  name:"游玩攻略",
  url: "/pages/travel_tips/travel_tips"
},
{
  icon:"/images/function-list/日志.svg",
  name:"旅游报告",
  url: "/pages/summery/summery"
},
{
  icon:"/images/function-list/推文.svg",
  name:"官方推文",
  url: "/pages/news/news"
}
],
gridList:[
  { image:"https://www.aiguider666.asia/images/0016.jpg",
    name:"白云峰",
    view_longitude:117.01357326779271,
    view_latitude:36.65994926544465,
    distance:0
  },

  { image:"https://www.aiguider666.asia/images/0058.jpg",
    name:"海豹池",
    view_longitude:117.01577508957041,
    view_latitude:36.66135775701884,
    distance:0
    },
  
  {image:"https://www.aiguider666.asia/images/0082.jpg",
  name:"晴雨溪",
  view_longitude:117.01730248312924,
  view_latitude:36.66125391726963,
  distance:0
  },
  {image:"https://www.aiguider666.asia/images/0090.jpg",
  name:"灰池泉",
  view_longitude:117.0179367339814,
  view_latitude:36.66187170877694,
  distance:0
  },
  {image:"https://www.aiguider666.asia/images/0003.jpg",
  name:"白龙湾",
  view_longitude:117.01409453551867,
  view_latitude:36.659934649834625,
  distance:0
  },
  {image:"https://www.aiguider666.asia/images/0034.jpg",
  name:"杜康泉",
  view_longitude:117.01475186748405,
  view_latitude:36.66111258097829,
  distance:0
  },
{image:"https://www.aiguider666.asia/images/0085.jpg",
name:"浅井泉",
view_longitude:117.01720370882992,
view_latitude:36.661674316162824,
distance:0
},
{image:"https://www.aiguider666.asia/images/0096.jpg",
name:"百花园",
view_longitude:117.01601800481114,
view_latitude:36.6628337365792,
distance:0
},
{image:"https://www.aiguider666.asia/images/0067.jpg",
name:"步青桥",
view_longitude:117.01581740390611,
view_latitude:36.66301679036527,
distance:0
},
{image:"https://www.aiguider666.asia/images/0009.jpg",
name:"虬石",
view_longitude:117.01607825350357,
view_latitude:36.66146602489074,
distance:0
},
],
   tempdis:0,
   defaultLongitude: config.center_longitude,
   defaultLatitude: config.center_latitude,
   distancelist:[],
   result:[],
   msg : "",
   text:"请搜索你想了解或前去的景点",
   gridListVisible: true,
   link:"https://s1.aigei.com/src/img/gif/05/053063f56e6840b5a87ac6230bc189da.gif?imageView2/2/w/400%7Cwatermark/3/image/aHR0cHM6Ly9zMS5haWdlaS5jb20vd2F0ZXJtYXJrL21pZGRsZS1HMTAucG5nP2U9MTczNTQ4ODAwMCZ0b2tlbj1QN1MyWHB6ZnoxMXZBa0FTTFRrZkhON0Z3LW9PWkJlY3FlSmF4eXBMOjA1N2dNbTVKSEpHMHBUSTZqZ3hQb0Q0U0h3RT0=/dissolve/100/gravity/Center/dx/-18/dy/25&e=1735488000&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:wIl87D9c-Ae8qKJMzfdjNCjmF6E="
  },
// 计算距离
// 计算距离，返回 Promise 对象
getDistance(latitude, longitude) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://apis.map.qq.com/ws/distance/v1/matrix?mode=walking',
      data: {
        key: 'EH2BZ-USOKI-U5OGY-ULBEN-DJQUO-TAFFF',
        from: `${this.data.defaultLatitude},${this.data.defaultLongitude}`,
        to: `${latitude},${longitude}`
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        const distance = res.data.result.rows[0].elements[0].distance;
        console.log(res.data.result.rows);
        resolve(distance); // 在成功获取距离后返回距离数据
      },
      fail(err) {
        console.error('计算距离失败:', err);
        reject(err); // 处理失败情况
      }
    });
  });
},
calculateDistances() {
  const that = this;
  return new Promise((resolve, reject) => {
    const gridList = that.data.gridList; // 保存原始数据
    const batchSize = 5; // 每批处理的元素数量
    let currentIndex = 0; // 当前处理的元素索引

    const processBatch = () => {
      const batch = gridList.slice(currentIndex, currentIndex + batchSize);
      const promises = batch.map(item => {
        return that.getDistance(item.view_latitude, item.view_longitude)
          .then(distance => {
            item.distance = distance; // 更新距离
          })
          .catch(err => {
            console.error('计算距离失败:', err);
          });
      });

      Promise.all(promises)
        .then(() => {
          currentIndex += batchSize; // 更新索引，处理下一批次
          if (currentIndex < gridList.length) {
            setTimeout(processBatch, 1000); // 延迟一段时间后继续处理下一批次，避免过快触发并发限制
          } else {
            // 所有距离计算完成后更新 UI
            that.sortAndSetList();
            resolve(); // 成功完成计算距离
          }
        })
        .catch(err => {
          console.error('计算距离失败:', err);
          reject(err); // 处理失败情况
        });
    };

    // 开始处理第一批次
    processBatch();
  });
},
refreshDistance: function () {
  const that = this;
  // 获取用户当前位置
  wx.getLocation({
    type: 'gcj02', // 使用国测局坐标系获取经纬度
    success: function (res) {
      const latitude = res.latitude;
      const longitude = res.longitude;

      // 更新页面中的经纬度信息
      that.setData({
        defaultLongitude: longitude,
        defaultLatitude: latitude
      });
      // 计算距离
      that.calculateDistances()
        .then(() => {
          // 距离计算完成后检查是否有过滤条件
          if (that.data.msg !== "") {
            that.searchAttractions(); // 正确调用 searchAttractions 方法
          }
        })
        .catch(err => {
          console.error('计算距离失败:', err);
          // 处理距离计算失败的情况
        });

      // 显示提示
      wx.showToast({
        title: '已经根据您的当前位置动态更新了与各景点的距离',
        icon: 'none',
        duration: 3000 // 弹窗持续时间
      });
    },
    fail: function (err) {
      console.error('获取位置信息失败', err);
      wx.showToast({
        title: '获取位置信息失败，请稍后再试',
        icon: 'none'
      });
    }
  });
},
  insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
      let current = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j].distance > current.distance) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = current;
    }
    return arr;
  },
  sortAndSetList() {
    let sortedGridList = this.insertionSort(this.data.gridList);
    this.setData({
      gridList: sortedGridList
    });
  },
  navigateToAnotherPage: function() {
    let user = this.data.user
    wx.navigateTo({
      url: '/pages/dialogue/dialogue?user=' + user,
    })
  },
  // 输入框内容变化时的处理函数
  inputHandler(event) {
    this.setData({
      msg: event.detail.value // 更新输入框的内容到数据中的 msg 属性
    });
  },
  // 搜索按钮点击事件处理函数
  searchAttractions(event) {
    let msg = this.data.msg.trim(); // 获取输入的搜索关键词，并去除首尾空格
    if (msg === "") {
      this.setData({
        result: [] // 将 result 设置为空数组，以显示所有的景观
      });
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      });
      return;
    }
  
    let result = [];
    this.data.gridList.forEach(attraction => {
      if (attraction.name.includes(msg)) {
        result.push(attraction); // 将符合条件的景点对象添加到结果数组中
      }
    });
  
    if (result.length === 0) {
      wx.showToast({
        title: '未找到相关景点',
        icon: 'none'
      });
    } else {
      this.setData({
        result: result // 更新搜索结果
      });
      console.log("搜索结果:", this.data.result); // 输出搜索结果，用于调试
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.calculateDistances();
    const user = wx.getStorageSync('user');
    this.setData({
      user: user
    })
    console.log(user);
    wx.removeStorageSync('user');
  },
  getSwiperlist(){},
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