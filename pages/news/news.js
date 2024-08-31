Page({
  data: {
    backgroundImage: 'https://th.bing.com/th/id/R.7944d74a22810e27d5f93985689dcb71?rik=wTOuWl%2b225C2Gg&riu=http%3a%2f%2fseopic.699pic.com%2fphoto%2f50129%2f2785.jpg_wh1200.jpg&ehk=N7OnMEfqA7%2bLHJTp2xot%2fl4p92lv3ixC6pzWWdU4gGc%3d&risl=&pid=ImgRaw&r=0', // 替换为你的实际图片 URL
    userInfo: {
      avatar: 'https://img.zcool.cn/community/014a3659f03c64a801216a4b9de9e8.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100',
      name: '天下第一泉风景区',
      gold: 3990,
      coupons: 15,
      balance: 0
    },
    user: "", //用户信息
    news: [
      {
        id: 1,
        image: 'https://mmbiz.qpic.cn/sz_mmbiz_jpg/iaVNs1MjobfFfFx2AEjpSg6aCw5odkPFwhTMcTNXu0hFcsAXQQKJE0FwF5SzT0bIfN5uEZbKJGhIBfSzUGvctbw/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
        title: '明湖赛龙舟 竞渡迎奥运',
        date: '2024-06-22',
        summary: '“汉酱杯”2024中国·济南明湖龙舟文化节暨第二十三届明湖龙舟邀请赛开幕，全国13支队伍赛龙夺锦',
        url: 'https://mp.weixin.qq.com/s/GMsu_NUAzmeJso3WpFE45Q'
      },
      {
        id: 2,
        image: 'https://mmbiz.qpic.cn/sz_mmbiz_jpg/iaVNs1MjobfF0MurDgWEGz2KVVVAzw839E1VNHIk8bTwV1Q9pqtVG9MibVPl23DBH2QS70XNWD6eedV1Iibgic5b4A/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
        title: '木香花开 藏在趵突泉公园里的花瀑',
        date: '2024-04-23',
        summary: '在繁花似锦的春日中，每一种花都有其独特的魅力。',
        url: 'https://mp.weixin.qq.com/s/2NI3vzIEczEpZegtfsZaCA'
      },
      // 更多新闻条目...
      {
        id: 3,
        image: 'https://th.bing.com/th/id/R.33a613b775505e81e16cb461488b4dfe?rik=PDH9yeuskvMauA&riu=http%3a%2f%2fyouimg1.c-ctrip.com%2ftarget%2f100l080000003f0q3707B.jpg&ehk=GHpHFKoSL%2fOvrekkGh8xkQYL3fN6MAOLySt37HlJ0A0%3d&risl=&pid=ImgRaw&r=0',
        title: '大明湖景区部分区域封闭施工告知书',
        date: '2024-04-07',
        summary: '由中电建生态环境集团有限公司承建的济南市大明湖排水分区河道综合整治工程——西圩子壕河段拓宽综合治理施工将于近期在大明湖景区展开。',
        url: 'https://mp.weixin.qq.com/s/-Tbmehb7UFIGeNOEC_I43A'
      },
      {
        id: 4,
        image: 'https://th.bing.com/th/id/R.f64b06b5c7e30fc4755532010706febc?rik=CsZWZs9YymRK9g&riu=http%3a%2f%2fn.sinaimg.cn%2ftranslate%2fw1080h720%2f20180211%2fp-y8-fyrkuxt5880753.jpg&ehk=a%2bS%2fjKtkyKN2kT5EYyyT%2b2XGx1DpiLeumjIhEZdmhhQ%3d&risl=&pid=ImgRaw&r=0',
        title: '关于济南市第43届趵突泉花灯会期间，免费证件和年票使用情况的说明',
        date: '2024-02-22',
        summary: ' ',
        url: 'https://mp.weixin.qq.com/s/ew8O847lwfwcKu5c6xPg1g'
      },
      {
        id: 5,
        image: 'https://mmbiz.qpic.cn/sz_mmbiz_jpg/iaVNs1MjobfF0MurDgWEGz2KVVVAzw839E1VNHIk8bTwV1Q9pqtVG9MibVPl23DBH2QS70XNWD6eedV1Iibgic5b4A/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
        title: '春节假期完美收官 天下第一泉风景区纳客209万人次',
        date: '2024-04-23',
        summary: '2024年春节假期，济南天下第一泉风景区延续了2023年以来的火爆局面，泉似潮涌，客似云来。',
        url: 'https://mp.weixin.qq.com/s/emTVaXDTCLBwLBft-P9yaA'
      },
      {
        id: 6,
        image: 'https://pic.nximg.cn/20120509/7336507_210631630000_2.jpg',
        title: '济南市公安局、济南市园林和林业绿化局关于维护趵突泉花灯会安全秩序的通告',
        date: '2024-02-17',
        summary: '',
        url: 'https://mp.weixin.qq.com/s/5TH3y3m28Mi2JBb3UGJErQ'
      },
      {
        id: 7,
        image: 'https://mmbiz.qpic.cn/sz_mmbiz_jpg/iaVNs1MjobfFUiaIjF0c6fiazEfgLYicXicx8qukV5ddJhYpFlLl9hrDF8sd4ibcclHlLdeXicyEhz8r5b5RgQ2An7ibEg/640?wx_fmt=jpeg&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp',
        title: '龙腾盛世 泉甲天下',
        date: '2024-02-01',
        summary: '济南市第四十三届趵突泉迎春花灯会与您相约大年初一',
        url: 'https://mp.weixin.qq.com/s/1c6hBWng1hE00gczNniUzg'
      },
      {
        id: 8,
        image: 'https://mmbiz.qpic.cn/sz_mmbiz_jpg/iaVNs1MjobfEblMIetRkm6ApkZPk7EbkAyvPtXZeg1VGlicHQfYmeuF8OciaSdsb6Sic4iaBPOTcMTAfqma1r3iaosfg/640?wx_fmt=jpeg&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp',
        title: '赓续丹青文脉 再谱写意华章——王雪涛诞辰120周年纪念活动在济南举办',
        date: '2023-12-14',
        summary: '',
        url: 'https://mp.weixin.qq.com/s/a8X_iNnc3g8oMEOuoRdKFA'
      },
      {
        id: 9,
        image: 'https://mmbiz.qpic.cn/sz_mmbiz_jpg/iaVNs1MjobfF9LKtSYAzEVYWKfK2U1e7fQLe5qatKicZfk2HrsBxviccWibyibaRWq9tu52yus7OGNbLS3SE8C0WQuw/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
        title: '清泉菊韵，第十四届中国菊花展览会捷报连连！',
        date: ' 2023-12-07',
        summary: '济南市天下第一泉风景区服务中心代表济南市参加本届菊展，共斩获三金一银一铜',
        url: 'https://mp.weixin.qq.com/s/TD98hebjtaOmMkexEOCXcw'
      },
      {
        id: 10,
        image: 'https://mmbiz.qpic.cn/sz_mmbiz_jpg/iaVNs1MjobfEZrHFk9BBecEAC0M2L4WeyW6bZZZWriaNYq2qqMQIq621muIR0t5ecibwRb9L5VibHkKyozQHXAzr8A/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp',
        title: '“荷花绽放 超然起舞”——中国舞优秀作品惠民演出活动在超然楼举行',
        date: '2023-11-08',
        summary: '',
        url: 'https://mp.weixin.qq.com/s/F4T8gTgAoGlSmdAwdNBAZg'
      },
      {
        id: 11,
        image: 'https://mmbiz.qpic.cn/sz_mmbiz_png/iaVNs1MjobfFrLdHPbKlCye57uP57tFA1vOoEcj2P2PTjldUYj6cicGHhFxiaCibBQ2aVALIrFE7nhrvRRZMsFexhg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
        title: '济南市第四十四届趵突泉金秋菊展开幕',
        date: ' 2023-10-23',
        summary: '本届以“菊舞华章，魅力泉城”为主题的菊展，于2023年10月20日至11月19日与八方游客相约在美丽的趵突泉畔。',
        url: 'https://mp.weixin.qq.com/s/zj7L3-u2eVUnx4OpXdVEIA'
      },
      {
        id: 12,
        image: 'https://pic.nximg.cn/file/20210106/13509473_152352304088_2.jpg',
        title: '“清泉盈眸·廉洁沁心”廉洁文化党课',
        date: '2023-10-13',
        summary: '我们以“清泉盈眸·廉洁沁心”为题，从“联语碑文，翰墨言志”“名士巍巍，崇德尚廉”“枝叶关情，天地正气”三个方面总结了景区蕴含的廉洁文化内容，制作成党课视频。',
        url: 'https://mp.weixin.qq.com/s/MDJOv8dRnUl_XL93TwTy_w'
      },
      {
        id: 13,
        image: 'https://mmbiz.qpic.cn/sz_mmbiz_png/iaVNs1MjobfHbuCJAyWiblcSgUPKW6tbibsPSUIqUz5ZlprXKF3UZHtvibIPb0lfCiarB4uLZVnIsUWsibNPokawSSXQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp',
        title: '中秋国庆假期完美收官 天下第一泉风景区纳客203万人次',
        date: '2023-10-07',
        summary: '',
        url: 'https://mp.weixin.qq.com/s/sVGINjEnAe8c9_anDfbG7g'
      },
      {
        id: 14,
        image: 'https://mmbiz.qpic.cn/sz_mmbiz_jpg/iaVNs1MjobfFosF8GYicibVn4jUnpJXrrrPwAUCCFibgx2kqBy6YOq81dDyqqz1P9AXOicvGR6Jaj1DR8bJ4Hviaatew/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
        title: '“涌泉相报”庆祝泉水复涌20周年快闪活动在超然楼精彩上演',
        date: '2023-09-07',
        summary: '2023年9月6日，“天下第一泉”趵突泉自2003年9月6日复涌以来已经连续喷涌了20年，创造了自上世纪70年代以来的趵突泉持续喷涌时间的新纪录。',
        url: 'https://mp.weixin.qq.com/s/LZ05irGhSdat1Dh8VlhwPA'
      }
    ]
  },

  onLoad: function() {
    // 如果需要在这里进行任何其他初始化操作，可以添加代码
  },

  openArticle: function(event) {
    const url = event.currentTarget.dataset.url;
    wx.navigateTo({
      url: `/pages/webview/webview?url=${encodeURIComponent(url)}`
    });
  }
})
