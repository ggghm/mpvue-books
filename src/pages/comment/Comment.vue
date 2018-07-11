<template>
  <div class="container">
  	<Commentlist :comments="commentlist"></Commentlist>
  </div>
</template>

<script>
import {get} from '@/util'
import Commentlist from '@/components/Commentlist'
export default {
  data () {
    return {
      comments: [],
      userinfo: {}
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
      const comments = await get('/weapp/commentuser', {
        openid: this.userinfo.openId
      })
    }
  },
  onShow () {
    if (!this.userinfo.openId) {
      const userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        thsi.userinfo = userinfo
        this.init()
      }
    }

  }

}
</script>

<style>

</style>
