<template>
  <div class="swiper">
    <swiper
      indicator-dots="true"
      indicator-active-color="#EA5A49"
      circular="true"
      autoplay="true"
      interval="6000"
    >
      <swiper-item
        v-for="(item, index) in imageArr"
        :key="index"
        class="wraper">
          <img
          v-for="(book, bookindex) in item"
          :key="bookindex"
          :src="book.image"
          mode="aspectFit"
          class="swiperImage"
          @click="naviToBookDetail(book)"
          />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    // top包含四个字段：'id','title','image','count'
    top: Array
  },
  computed: {
    imageArr () {
      const res = this.top
      console.log(res.slice(0, 3), res.slice(3, 6), res.slice(6))
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6)]
    }
  },
  methods: {
    naviToBookDetail (item) {
      wx.navigateTo({
        url: `/pages/detail/main?id=${item.id}`
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .swiper
    margin-top:10px
    .wraper
      display: flex
      justify-content: space-around
      .swiperImage
        max-width: 30%
        max-height: 130px
</style>
