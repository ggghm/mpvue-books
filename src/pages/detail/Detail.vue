<template>
  <div>
    <!-- 上方的图书卡片 -->
    <BookInfo :bookinfo="bookinfo"></BookInfo>
    <!-- 下面的评论区域加功能区 -->
    <div class="comment">
      <textarea
        v-model="comment"
        class="textarea"
        :maxlength="100"
        placeholder="请添加图书评论"
      ></textarea>
      <div class="location">
        地理位置
        <switch color="#EA5A49" :checked="location" @change="getGeo"></switch>
        <span>{{location}}</span>
      </div>
      <div class="phone">
        手机型号
        <switch color="#EA5A49" :checked="phone" @change="getPhone"></switch>
        <span>{{phone}}</span>
      </div>
      <div class="map">
        接入地图
        <switch color="#EA5A49" :checked="map" @change="getMap"></switch>
      </div>
      <button class="commentBtn" @click="addComment">
        评论
      </button>
    </div>
  </div>
</template>

<script>
import {get, post, showModal} from '@/util'
import BookInfo from '@/components/BookInfo'
export default {
  data () {
    return {
      bookid: '',
      bookinfo: {},
      comment: '',
      location: '',
      phone: '',
      map: '',
      userinfo: {}
    }
  },
  components: {
    BookInfo
  },
  methods: {
    // 进入页面后，获取图书详细信息，同时将数据库中的count字段加一
    async getDetail() {
      const info = await get('/weapp/bookdetail', {id: this.bookid})
      wx.setNavigationBarTitle({
        title: info.title
      })
      this.bookinfo = info
    },
    getGeo (e) {
      let url = 'https://apis.map.qq.com/ws/geocoder/v1/'
      if(e.target.value) {   // 如果选中
        wx.getLocation({
          success: res => {
            wx.request({
              url,
              // 腾讯地图中要求传入的参数
              data: {
                location: `${res.latitude},${res.longitude}`,
                key: 'LUYBZ-3YKCW-D2SR3-OWIV7-AB2ZF-LWFO5'
              },
              success: res => {
                console.log(res)
                if(res.data.status===0) {
                  this.location = res.data.result.address_component.city
                } else {
                  this.location = '未知地点'
                }
              }
            })
          }
        })
        // console.log(phoneInfo)
        // this.location = phoneInfo.model
      } else {
        this.location = ''
      }
    },
    getPhone (e) {
      if(e.target.value) {   // 如果选中
        const phoneInfo = wx.getSystemInfoSync()
        // console.log(phoneInfo)
        this.phone = phoneInfo.model
      } else {
        this.phone = ''
      }
    },
    getMap (e) {
      if(e.target.value) {
        wx.getLocation({
          success: res => {
            wx.openLocation ({
              latitude: res.latitude,
              longitude: res.longitude
            })
          }
        })
      }
    },
    // 异步将评论添加到数据库
    async addComment () {
      // 如果没有评论信息，什么都不做
      if (!this.comment) {
        return
      }
      // 返回给后端的数据，评论内容，地理位置，图书id，openid
      const data = {
        openid: this.userinfo.openId,
        bookid: this.bookid,
        comment: this.comment,
        phone: this.phone,
        location: this.location
      }
      // console.log(data)
      try {
        await post('/weapp/addcomment', data)
        this.comment = ''
      } catch (e) {
        showModal('失败', e.msg)
      }
    },
    // 异步获取图书评论列表
    async getComments () {
      // 注意啊！！！这里要加一个 await 这个promise才会resolve啊，不然就是个promise
      const commentInfo = get('/weapp/commentlist', {bookid: this.bookid})
      console.log('已经评论的:',commentInfo)
    }
  },
    mounted() {
      // 如何获取小程序在 page onLoad 时候传递的 options
      // 在所有页面的组件内可以通过 this.$root.$mp.query 进行获取。
      // Card.vue 中在 a 标签中的跳转链接传入了参数 book.id，这里页面一渲染就获取到它
      this.bookid = this.$root.$mp.query.id
      this.getDetail()
      this.getComments()   // 根据图书的id获取当前图书的评论列表
      // 从缓存中获取oprnid
      const userinfo = wx.getStorageSync('userInfo')
      if(userinfo) {
        this.userinfo = userinfo
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .comment
    margin-top: 10px
    .textarea
      width: 730rpx
      padding: 10rpx
      height: 200rpx
      background: #eeeeee
    .commentBtn
      color: #ffffff
      background: #EA5A49
</style>
