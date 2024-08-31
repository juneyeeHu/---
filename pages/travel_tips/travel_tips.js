Page({
  data: {
    currentTab: 0,
    toView: 'section0',
    height: 0,
    currentFacilityIndex: null,
    facilityDetails: [
      { title: "储物柜租赁", content: "寄存点: 每个门口" },
      { title: "导游服务", content: "提供专业导游服务，详细解说景点历史和文化,详见导航页面" },
      { title: "婴儿车租赁", content: "*租用位置：每个门口； *收费标准：前6小时免费" },
      { title: "轮椅租赁", content: "*租用位置：每个门口； *收费标准：前6小时免费" },
      { title: "母婴室", content: "提供母婴室，方便带婴儿的游客。位置：东门旁边游客中心" },
      { title: "充电宝租赁", content: "提供充电宝租赁服务，解决游客手机电量不足的问题。每个门都有" },
      { title: "自动贩卖机", content: "在游客中心提供自动贩卖机，出售各种饮料和小吃。" },
      { title: "卫生间", content: "提供干净卫生的公共卫生间。见导航界面" }
    ],
    user: "",//用户信息
  },
  switchTab: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index,
      height: wx.getSystemInfoSync().windowHeight, // 获取屏幕高度
      toView: 'section' + index
    });
  },
  onLoad: function() {
    this.setData({
      toView: 'section' + this.data.currentTab
    });
  },
  showDetail: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentFacilityIndex: index
    });
  }
});