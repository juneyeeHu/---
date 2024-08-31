Page({
  onLoad: function(options) {
    this.setData({
      url: decodeURIComponent(options.url)
    });
  }
})
