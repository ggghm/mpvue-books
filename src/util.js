// 工具函数库，将所有公用的工具性质的模块都封装到这里，用户端调用的工具库

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
      // 对要访问的子目录进行拼接
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          // wx.request 返回的数据形式就是这样res.data.data
          // 这个地方返回的数据是从ctx，也就是koa中拿到的
          console.log('456', res.data.data)
          resolve(res.data.data)
        } else {
          showModal('失败', res.data.data.msg)
          reject(res.data)
        }
      }
    })
  })
}
export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}
export function showSuccess (text) {
  // toast （Android系统中一种消息框类型）
  wx.showToast({
    title: text,
    icon: 'success'
  })
}
