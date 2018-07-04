// 工具函数库，将所有工具性质的模块都封装到这里

import config from './config'

// http get工具函数，用户获取数据
export function get (url, data) {
  return request(url, 'GET', data)
}

export function post (url, data) {
  return request(url, 'POST', data)
}

function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          // console.log('res', res)
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}

export function showSuccess (text) {
  // toast （Android系统中一种消息框类型）
  wx.showToast({
    title: text,
    icon: 'success'
  })
}
