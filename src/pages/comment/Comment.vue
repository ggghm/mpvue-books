<template>
  <div class="container">
  	<Commentlist :comments="commentlist"></Commentlist>
  </div>
</template>

<script>
import {get} from '@/utils'
import Commentlist from '@/components/Commentlist'
export default {
  data () {
    return {
      comments: [],
      userinfo: []
    }
  },
  components: {
    Commentlist
  },
  methods: {
    async getComments() {
      const comments = await get('/weapp/commentuser', {
        openid: this.userinfo.openId
      })
    }
  },
  onShow () {
    if (!this.userinfo.openId) {
      const userinfo = wx.getStorageSync()
      if (userinfo) {
        thsi.userinfo = userinfo
      }
    }

  }

}
</script>

<style>

</style>
