// 工具函数库，将所有工具性质的模块都封装到这里

import config from './config'

export function get (url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
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
