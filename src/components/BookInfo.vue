<template>
  <div class="bookinfo">
    <div class="bgWrapper">
      <img
        class="backGround"
        :src="bookinfo.image"
        mode="aspectFill"
      >
      <div class="imgWrapper">
        <img
          class="frontImage"
          :src="bookinfo.image"
          model="aspectFit"
        >
        <div class="bookinfo">
          <div class="title">
            {{bookinfo.title}}
          </div>
          <div class="author">
            {{bookinfo.author}}
          </div>
        </div>
      </div>
    </div>
    <div class="ownerAndRate">
      <div class="owner">
        <img
          class="avatar"
          :src="bookinfo.Url"
          mode="aspectFit"
        >
        {{bookinfo.nickName}}
      </div>
      <div class="rate text-primary">
        {{bookinfo.rate}}
        <Rate :value="bookinfo.rate"></Rate>
      </div>
    </div>
    <div class="publishAndPrice">
      <div class="publisher">
        {{bookinfo.publisher}}
      </div>
      <div class="price">
        {{bookinfo.price}}
      </div>
    </div>
    <div class="tags text-primary">
      <div class="badge" v-for="tag in bookinfo.tags" :key="tag">{{tag}}</div>
    </div>
    <div class="summary">
      <p v-for="(para,index) in bookinfo.summary" :key="index">{{para}}</p>
    </div>
  </div>
</template>

<script>
import Rate from '@/components/Rate'
export default {
  props: ['bookinfo'],
  components: {
    Rate
  },
  computed: {
    backToBooklist () {
      return '/pages/book/main'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .bookinfo
    font-size: 14px
    .bgWrapper
      width: 750rpx
      height: 500rpx
      overflow: hidden
      position: relative
      .backGround
        filter: blur(15px)  // 设置模糊效果
        width: 100%
      .imgWrapper
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        .frontImage
          width: 200rpx
          max-height: 300rpx
        .bookinfo
          text-align: center
          color: #ffffff
          .title
            font-size: 20px
          .author
            font-size: 12px
    .ownerAndRate
      display: flex
      justify-content: space-between
      padding: 5px
      .avatar
        width: 20px
        height: 20px
        border-radius: 50%
        vertical-align: middle
        margin-top: -3px  // 微调一下
    .publishAndPrice
      display: flex
      justify-content: space-between
      padding: 5px
    .tags
      display: flex
      flex-wrap: wrap
      padding: 10px 10px 0 10px
      .badge
        padding:5px
        border: 1px solid #EA5149
        border-radius: 10px
        margin: 0 10px 5px 0
    .summary
      text-indent: 2em
      padding: 15px
      // padding-right: px  //为了视觉好看，右边通常会少一些
</style>
