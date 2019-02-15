//index.js
//获取应用实例
const app = getApp();
// const _ = require('../../miniprogram_npm/_lodash@4.17.11@lodash/index');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
      this.setMsg();
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        this.setMsg();
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo;
    if (!app.userInfoReadyCallback) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        this.setMsg();
      };
    }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        app.code2Session(res.code);
      }
    });
  },
  // 获取积分
  setMsg() {
    let msg;
    if (this.data.userInfo.allIntegral) {
      msg = `欢迎您再次光临，您的当前\r\n点心奖分【${
        this.data.userInfo.allIntegral.filter(p => p.integral_type === 'KDS')[0]
          .sum
      }】\r\n雪糕奖分【${
        this.data.userInfo.allIntegral.filter(p => p.integral_type === 'JIC')[0]
          .sum
      }】`;
    } else {
      msg = `感谢您的注册，系统赠送您!\r\n点心奖分【${
        this.data.userInfo.integralKDS.integral
      }】\r\n雪糕奖分【${this.data.userInfo.integralJIC.integral}】！`;
    }
    this.setData({
      motto: msg
    });
  }
});
