<template>
  <div>
    <img class="avatar" :src="userInfo.avatarUrl" alt="头像">
    <button
      class="login"
      v-if="!isInssued"
      open-type="getUserInfo"
      lang="zh_CN"
      @getuserinfo="doLogin"
    >登录</button>
    <div class="nickname" v-if="isInssued">
      {{userInfo.nickName}}
    </div>
    <!-- 只有登陆成功后获得openId才能使用扫码功能 -->
    <button class="btn" @click="scanBook" v-if="userInfo.openId">扫描图书</button>
    <YearProgress></YearProgress>
  </div>
</template>

<script>
// 使用了wafer2的sdk来读取用户的个人信息，与之前版本不一样的是现在要通过
// button的点击来触发获取用户信息open-type="getUserInfo"
import {showSuccess} from '../../util.js'
import qcloud from 'wafer2-client-sdk'
import config from '../../config'
import YearProgress from '@/components/YearProgress'
export default {
  data () {
    return {
      isInssued: false,
      userInfo: {
        avatarUrl: '../../../static/img/timg.jpg',
        nickName: ''
      }
    }
  },
  components: {
    YearProgress
  },
  methods: {
    doLogin: function () {
      let vm = this
      // 获取个人信息之前，先看本地缓存有没有个人信息
      let user = wx.getStorageSync('userInfo')
      // 缓存没有个人信息
      if (!user) {
        // 这一步应该是异步操作
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
          success: function (userInfo) {
            // 登录成功后弹出提示信息
            showSuccess('登录成功')
            console.log(userInfo)
            // vm.userInfor.imgUrl = userInfo.avatarUrl
            // vm.userInfor.nickName = userInfo.nickName
            vm.userInfo = userInfo
            vm.isInssued = true
            // 将个人信息以同步方式存入缓存
            wx.setStorageSync('userInfo', userInfo)
          },
          fail: function (err) {
            console.log('登录失败', err)
          }
        })
      } else {
        // this.userInfor.imgUrl = user.avatarUrl
        // this.userInfor.nickName = user.nickName
        this.userInfo = user
        this.isInssued = true
      }
    },
    // 允许从相机和相册扫码
    scanBook () {
      wx.scanCode({
        success: (res) => {
          console.log(res)
        }
      })
    }
  }
}
</script>

<style scoped>
.avatar{
  display: block;
  width: 200rpx;
  height: 200rpx;
  border-radius: 100rpx;
  margin: 0 auto;
  margin-top:100rpx;
}
.login{
  width: 150rpx;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 35rpx;
  margin-top: 20rpx;
}
.nickname{
  width: 150rpx;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 35rpx;
  margin: 0 auto;
  text-align: center;
  margin-top: 20rpx;
}
.btn{
  width: 80%;
  margin-top: 40rpx;
}
</style>
