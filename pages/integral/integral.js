// pages/integral/integral.js
// const Toast = require('../../miniprogram_npm/_vant-weapp@0.5.3@vant-weapp/toast/toast');
import Toast from '../../miniprogram_npm/_vant-weapp@0.5.3@vant-weapp/toast/toast';

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showCT: false,
    changeType: { key: 'KDS', text: '点心奖分' },
    columns: [
      { key: 'KDS', text: '点心奖分' },
      { key: 'JIC', text: '雪糕奖分' }
    ],
    userInfo: {},
    changeNumber: '1',
    changeNumberError: false,
    errorMessage: '',
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  // 更改兑换类型
  selChangeType() {
    this.setData({
      showCT: true
    });
  },
  onClose() {
    this.setData({
      showCT: false
    });
  },
  onConfirm(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      changeType: value,
      showCT: false
    });
  },
  onClickIcon() {
    Toast('1点心奖分=2雪糕奖分');
  },
  numberChange(value) {
    const re = /^[1-9]+[0-9]*]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
    if (!re.test(value.detail)) {
      return this.setData({
        changeNumberError: true,
        errorMessage: '兑换数量必须是整数！'
      });
    }
    if (
      this.data.changeType.key === 'KDS' &&
      parseInt(value.detail) * 2 > this.data.userInfo.integralJIC.integral
    ) {
      return this.setData({
        changeNumberError: true,
        errorMessage: '兑换数量超出当前雪糕奖分！'
      });
    }
    if (
      this.data.changeType.key === 'JIC' &&
      parseInt(value.detail) > this.data.userInfo.integralJIC.integral * 2
    ) {
      return this.setData({
        changeNumberError: true,
        errorMessage: '兑换数量超出当前雪糕奖分！'
      });
    }
    this.setData({
      changeNumberError: false,
      errorMessage: ''
    });
  },
  onSubmit() {
    this.setData({
      loading: true
    });
    app.$axios
      .post({
        url: '/change-integral',
        data: {
          userId: this.data.userInfo.id,
          changeType: this.data.changeType.key,
          number: this.data.changeNumber
        }
      })
      .then(result => {
        Toast.success('兑换发布成功！请耐心等待一下！');

        let second = 3;
        const timer = setInterval(() => {
          second--;
          if (second) {
            Toast.setData({
              message: `兑换发布成功！请耐心等待一下！倒计时 ${second} 秒`
            });
          } else {
            clearInterval(timer);
            Toast.clear();
            wx.navigateBack({
              delta: 1
            });
          }
        }, 1000);
      })
      .catch(err => {});
  }
});
