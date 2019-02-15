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
    if (app.globalData.userInfo && this.data.canIUse) {
      this.wxlogin();
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.wxlogin();
        }
      });
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.wxlogin();
  },
  // 获取openid 调用app
  wxlogin() {
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
    if (!this.data.userInfo.newIs) {
      msg = `欢迎您再次光临，您的当前\r\n点心奖分【${
        this.data.userInfo.integralKDS.integral
      }】\r\n雪糕奖分【${this.data.userInfo.integralJIC.integral}】`;
    } else if (
      this.data.userInfo.integralKDS &&
      this.data.userInfo.integralJIC
    ) {
      msg = `感谢您的注册，系统赠送您!\r\n点心奖分【${
        this.data.userInfo.integralKDS.integral
      }】\r\n雪糕奖分【${this.data.userInfo.integralJIC.integral}】！`;
    }
    this.setData({
      motto: msg
    });
  },
  // 跳转积分兑换页面
  toIntegral() {
    wx.navigateTo({
      url: '../integral/integral'
    });
  }
});
