/*
 * @Author: 吴占超
 * @Date: 2019-02-14 18:28:30
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-02-14 18:50:29
 * 自定义 wx.request 封装
 */

export default class RequestPromise {
  constructor() {
    this.baseUrl = 'http://192.168.1.102:8090';
  }
  /**
   * post json
   *
   * @param {*} { url, data, contextType = 'application/json' }
   * @returns
   * @memberof RequestPromise
   */
  post({ url, data, contextType = 'application/json' }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.baseUrl}${url}`,
        data,
        method: 'POST',
        header: { 'content-type': contextType },
        success(res) {
          resolve(res.data);
        },
        error(e) {
          reject(e);
        }
      });
    });
  }
}
