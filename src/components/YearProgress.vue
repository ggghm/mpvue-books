<template>
  <div>
    <progress
      :percent="persent"
      color="pink"
      class="progress"
      active="true"/>
    <p class="dayText">{{year}}已经过去了{{days}}天，{{persent}}%</p>
  </div>
</template>

<script>
export default {
  methods: {
    isLeapYear() {
      const year  = new Date().getFullYear()
      if(year%400===0) {
        return true
      } else if(year%4===0 && year%100!==0) {
        return true
      } else {
        return false
      }
    },
    getDayOfYear() {
      return this.isLeapYear() ? 366 : 365
    }
  },
  computed: {
    year() {
      return new Date().getFullYear()
    },
    days() {
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      // start是今年第一天
      let offset = new Date().getTime()-start.getTime()
      return parseInt(offset/1000/3600/24)+1
    },
    persent() {
      return (this.days*100/this.getDayOfYear()).toFixed(1)
    }
  }
}
</script>

<style>
.progress{
  width: 80%;
  margin: 0 auto;
  margin-top: 100rpx;
}
.dayText{
  text-align: center;
  margin-top: 10rpx;
}
</style>
