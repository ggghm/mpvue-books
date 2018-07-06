<template>
  <div>
    <Card v-for="book in books" :key="book.id" :book='book'></Card>
    <!-- <Card></Card> -->
  </div>
</template>

<script>
import {get} from '@/util.js'
import Card from '@/components/Card'
export default {
  data () {
    return {
      books: []
    }
  },
  components: {
    Card
  },
  methods: {
    async getList() {
      const books = await get('/weapp/booklist')
      this.books = books.list
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style>

</style>
