// const RequestPromise = require('./utils/request-promise.js');
import RequestPromise from './utils/request-promise.js';
//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // 登录
              wx.login({
                success: res => {
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  this.code2Session(res.code);
                }
              });
            }
          });
        }
      }
    });
  },
  globalData: {
    userInfo: null
  },
  $axios: new RequestPromise(),
  code2Session(code) {
    this.$axios
      .post({
        url: '/weixin/jscode2session',
        data: { code, ...this.globalData.userInfo }
      })
      .then(result => {
        this.globalData.userInfo = result;
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(this.globalData);
        }
      })
      .catch(err => {});
  }
});
