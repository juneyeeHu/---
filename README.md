# 游行智友——智能导游导览旅游平台安装说明书

## 目录
1. [项目简介](#项目简介)
2. [系统要求](#系统要求)
3. [使用步骤](#使用步骤)
    - [后端](#后端)
    - [前端](#前端)
4. [常见问题](#常见问题)
5. [联系方式](#联系方式)


## 项目简介
- “游行智友”的开发旨在解决当前旅游服务中存在的人工导游费用高昂、水平参差不齐以及现存的电子导游系统功能单一等问题。我们的目标是利用多模态人工智能大模型，通过模型微调等技术手段，实现对真实导游的模拟，从而为用户提供近乎零成本但专业水平很高的语音解说服务，并结合图像和文本数据，实现全方位的问答功能。
## 系统要求
- 前端：微信开发者工具
- 后端：
   - Ubuntu 18.04.6 LTS (GNU/Linux 4.15.0-76-generic x86_64)
   - GPU-A100 (NVIDIA-SMI 510.54；Driver Version: 510.54；CUDA Version: 11.6)
   - Python: 3.8 及以上
   - pytorch: 1.13.1; torchvision: 0.14.1


## 使用步骤

### 后端
1. **配置大模型环境**
- 参考博客进行配置：https://blog.csdn.net/m0_67632582/article/details/137745718?spm=1001.2014.3001.5501
2. **使用nginx实现反向代理**
- 因为微信小程序支持https协议进行网络通信，而不支持http协议，而大模型微调所在的服务器是内网服务器，且没有SSL证书，所以需要申请SSL证书，以及配置Nginx反向代理，才可以访问外网映射过的内网服务器。流程如下：
  
  1.SSL证书申请
   - 为服务器申请域名，将ip地址转为申请的域名，并进行域名解析。
   - 使用腾讯云平台等平台为域名申请SSL证书，实现绑定域名。
   - SSL证书部署
  
  2.SSL证书部署与Nginx反向代理
  - 将下载的文件 nginx-1.25.1.tar.gz 通过Xftp工具或者通过其他工具上传至Linux 服务器。
  - 安装openssl工具并检查配置、指定安装参数
  - 编译和安装
  - Nginx配置https与反向代理
  
3. **启动后端**
- 在项目根目录下存在back_end.py文件，其内包含有与跨模态大模型、音频传输等相关的所有接口的python实现，启动即可处理前端响应。
```
python back_end.py
```

### 前端
1. **微信开发者工具配置**
- 打开微信开发者工具，选择“导入项目”
- 选择 `your-project/frontend` 目录
- 点击“导入”
- 点击信任该项目作者

2. **配置url**
- 在项目/pages这个文件夹下的所有页面的.js文件中修改使用的url，比如在页面/pages/summery/summery.js中，请修改url为你实际的url：
```
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

```
3. **运行小程序**
- 在微信开发者工具中点击“编译”按钮，点击真机调试，微信扫码即可体验小程序。
- 与此同时，我们**提供了小程序的演示视频**以便大家能够首先直观地感受小程序的界面以及功能。



## 常见问题
- **服务无法启动**：请检查环境变量是否配置正确，依赖是否安装完整，服务器是否能与外界通信
- **小程序无法运行**：请确保微信开发者工具配置正确，API 地址是否正确，请尽量使用真机演示
- **大模型部署失败**：请检查坏境配置和模型路径是否正确

## 联系方式
如有任何问题或建议，请联系项目维护者：
- 邮箱：yijunhu60@gmail.com
- 微信：GoodyyyyMoon

感谢您使用游行智友智能导游导览旅游平台！
