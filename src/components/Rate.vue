<template>
  <div class="rate">
    <span>☆☆☆☆☆</span>
    <div class="hollow" :style="style">
      ★★★★★
    </div>
  </div>
</template>

<script>
export default{
  props: ['value'],
  computed: {
    style () {
      return `width:${this.value / 2 - 0.989}em`
    }
  }
}
</script>

<style lang="stylus" scoped>
  .rate
    position: relative
    display:inline-block
    .hollow
      position: absolute
      display: inline-block
      top: 0
      left: 0
      width: 0
      overflow: hidden
</style>
