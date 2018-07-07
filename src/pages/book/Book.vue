<template>
  <div>
    <Card v-for="book in books" :key="book.id" :book='book'></Card>
    <p class="text-footer" v-if="hasMore">没有更多数据</p>
    <!-- <Card></Card> -->
  </div>
</template>

<script>
import {get} from '@/util.js'
import Card from '@/components/Card'
export default {
  data () {
    return {
      books: [],
      page: 0,   // 用来实现分页加载
      hasMore: false
    }
  },
  components: {
    Card
  },
  methods: {
    // init 表示初始永远显示第一页，下拉刷新和初始化
    async getList(init) {
      if(init) {
        this.page = 0
        this.hasMore = false
      }
      wx.showNavigationBarLoading()  // 顶部会显示一个旋转的加载符号
      const books = await get('/weapp/booklist',{page: this.page})
      // console.log('books',books)
      // this.books = books
      // 如果本次从数据库中拿到的数据不足十条，且不是第一页，显示没有更多数据
      if(books.length<5 && this.page>0) {
        this.hasMore = true
      }
      // 如果是首次加载，两种情况：
      // 1.mounted() 首次进入页面
      // 2.onPullDownRefresh() 下拉刷新
      // 那么数据等于直接获取到的数据
      // 否则数据等于这次获取到的数据加上之前的数据
      if(init) {
        this.books = books
        wx.stopPullDownRefresh() // 终止下拉刷新
      } else {
        this.books = this.books.concat(books)
      }

      wx.hideNavigationBarLoading()
    }
  },
  mounted() {
    this.getList(true)
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.getList(true)
    // console.log('refresh')
  },
  onReachBottom() {
    if(this.hasMore) {
      // 没有更多了
      return false
    }
    this.page += 1
    this.getList()
  }
}
</script>

<style>

</style>
