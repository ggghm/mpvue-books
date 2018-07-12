<template>
  <div class="container">
  	<Commentlist
      type="userComment"
      :comments="commentlist"
      v-if="userinfo.openId"
      ></Commentlist>
    <div v-if="userinfo.openId">
      <div class="pageTitle">我的图书</div>
      <Card v-for="book in myBooks" :key="book.id" :book="book"></Card>
    </div>
  </div>
</template>

<script>
import {get} from '@/util'
import Card from '@/components/Card'
import Commentlist from '@/components/Commentlist'
export default {
  data () {
    return {
      comments: [],
      userinfo: {},
      commentlist: [],
      myBooks: []
    }
  },
  components: {
    Commentlist,
    Card
  },
  methods: {
    init () {
      wx.showNavigationBarLoading()
      this.getComments()
      this.getBooks()
      wx.hideNavigationBarLoading()
    },
    async getComments () {
      const comments = await get('/weapp/commentlist', {
        openid: this.userinfo.openId
      })
      this.commentlist = comments.list
    },
    async getBooks () {
      const myBooks = await get('/weapp/getmyBooks', {
        openid: this.userinfo.openId
      })
      this.myBooks = myBooks
      console.log(myBooks)
    }
  },
  onShow () {
    wx.setNavigationBarTitle({
      title: '我的图书'
    })
    if (!this.userinfo.openId) {
      const userinfo = wx.getStorageSync('userInfo')
      if (userinfo) {
        this.userinfo = userinfo
        this.init()
      }
    }
  },
  onPullDownRefresh () {
    this.init()
    wx.stopPullDownRefresh()
  }
}
</script>

<style>

</style>
