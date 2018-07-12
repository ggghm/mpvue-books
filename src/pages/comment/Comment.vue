<template>
  <div class="container">
  	<Commentlist
      type="userComment"
      :comments="commentlist"
      v-if="commentlist.length"
      ></Commentlist>
  </div>
</template>

<script>
import {get} from '@/util'
import Commentlist from '@/components/Commentlist'
export default {
  data () {
    return {
      comments: [],
      userinfo: {},
      commentlist: []
    }
  },
  components: {
    Commentlist
  },
  methods: {
    init () {
      wx.showNavigationBarLoading()
      this.getComments()
    },
    async getComments() {
      const comments = await get('/weapp/commentlist', {
        openid: this.userinfo.openId
      })
      this.commentlist = comments.list
    }
  },
  onShow () {
    if (!this.userinfo.openId) {
      const userinfo = wx.getStorageSync('userInfo')
      if (userinfo) {
        this.userinfo = userinfo
        this.init()
      }
    }
  }
}
</script>

<style>

</style>
