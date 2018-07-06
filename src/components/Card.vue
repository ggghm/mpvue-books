<template>
  <div class="book-card">
    <div class="thumb">
      <img :src="book.image" class="image" mode="aspectFit">
    </div>
    <div class="detail">
      <div class="left">
        {{book.title}}
      </div>
      <div class="right">
        {{book.rate}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: Object
  }
}
</script>

<style lang="stylus" scoped>
.book-card
  display: flex
  margin: 10rpx 0
  padding: 20rpx
  display: flex
  .thumb
    overflow: hidden
    width: 180rpx
    height: 180rpx
    display: flex
    .image
      max-height: 100%  // 基于父元素宽度
      max-width: 100%    // 基于父元素高度
      justify-content: center
      align-items: center
  .detail
    display: flex
    justify-content: space-between
    width: 100%
    padding: 20rpx
    font-size: 30rpx
    .left
      max-width: 60%
</style>
