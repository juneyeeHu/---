Page({
  data: {
    userId: '', // 初始化为空，稍后获取
    userData: {
      photos: [],
      qa: [],
      health: null
    },
    currentPhotoIndex: 0
  },

  onLoad(options) {
    // 假设 user_id 是通过页面跳转传递过来的
    if (options.userId) {
      this.setData({
        userId: options.userId
      });
      this.fetchUserData();
    } else {
      wx.showToast({
        title: '缺少用户ID',
        icon: 'none'
      });
    }
  },

  fetchUserData() {
    if (!this.data.userId) {
      wx.showToast({
        title: '请输入用户ID',
        icon: 'none'
      });
      return;
    }

    wx.request({
      url: `https://www.aiguider666.asia/get_user_data?user_id=${this.data.userId}`,
      method: 'GET',
      success: (res) => {
        if (res.data.error) {
          wx.showToast({
            title: res.data.error,
            icon: 'none'
          });
          return;
        }

        this.setData({
          userData: {
            photos: res.data.photos || [],
            qa: res.data.qa || [],
            health: res.data.health || null
          },
          currentPhotoIndex: 0
        });
      },
      fail: (err) => {
        wx.showToast({
          title: '获取数据失败',
          icon: 'none'
        });
        console.error('Error fetching user data:', err);
      }
    });
  },

  previewImage(e) {
    const current = e.currentTarget.dataset.src;
    wx.previewImage({
      current,
      urls: this.data.userData.photos
    });
  },

  generatePDF() {
    if (!this.data.userId) {
      wx.showToast({
        title: '请先获取用户数据',
        icon: 'none'
      });
      return;
    }

    wx.request({
      url: `https://www.aiguider666.asia/generatePDF`,
      method: 'POST',
      data: {
        user_id: this.data.userId
      },
      success: (res) => {
        if (res.data.file_url) {
          wx.downloadFile({
            url: res.data.file_url,
            success: (result) => {
              wx.openDocument({
                filePath: result.tempFilePath,
                fileType: 'pdf',
                success: () => {
                  console.log('PDF opened successfully');
                }
              });
            }
          });
        } else {
          wx.showToast({
            title: '生成PDF失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '生成PDF失败',
          icon: 'none'
        });
        console.error('Error generating PDF:', err);
      }
    });
  }
});
