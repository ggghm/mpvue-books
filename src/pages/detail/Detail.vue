<template>
  <div>图书id:{{bookid}}
  <BookInfo :bookinfo="bookinfo"></BookInfo>
  </div>
</template>

<script>
import {get} from '@/util'
import BookInfo from '@/components/BookInfo'
export default {
  data () {
    return {
      bookid: '',
      bookinfo: {}
    }
  },
  components: {
    BookInfo
  },
  methods: {
    // 进入页面后，获取图书详细信息，同时将数据库中的count字段加一
    async getDetail() {
      const info = await get('/weapp/bookdetail', {id:this.bookid})
      wx.setNavigationBarTitle({
        title: info.title
      })
      this.bookinfo = info
    }
  },
  mounted() {
    // 如何获取小程序在 page onLoad 时候传递的 options
    // 在所有页面的组件内可以通过 this.$root.$mp.query 进行获取。
    // Card.vue 中在 a 标签中的跳转链接传入了参数 book.id，这里页面一渲染就获取到它
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
  }
}
</script>

<style>

</style>
