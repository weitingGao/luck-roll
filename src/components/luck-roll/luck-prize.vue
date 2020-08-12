<template>
  <div class="luck-prize">
    <slot></slot>
  </div>
</template>

<script>
import floatMath from '../../utils/float-math.js'
export default {
  name: 'luck-prize',
  componentName: 'luck-prize',
  props: {
    total: { // 奖品图片总长度【必填】
      type: Number,
      default: 0
    },
    awardNum: { // 一列奖品个数【必填】
      type: Number,
      default: 0
    },
    speekSet: { // 滚动速度
      type: Array,
      default () {
        return [1500, 1800, 2000]
      }
    },
    defaultSite: { // 默认位置
      type: String,
      default: ''
    },
    runCount: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      newOffset: [], // 新的位置
      oldOffset: [], // 上次的位置
      andOffset: [], // 到周期结束的距离
      offset: '', // 单个奖品偏移量
      circleHeight: '', // 一个周期的高度
      slotsElm: null, // 插槽元素
      running: false, // 是否在持续跑
      timer: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.slotsElm = this.$slots.default
      let font = document.documentElement.style.fontSize.slice(0, -2)
      this.circleHeight = floatMath.numDiv(floatMath.numMulti(floatMath.numDiv(this.total, 37.5), font), 2)
      this.offset = floatMath.numDiv(this.circleHeight, this.awardNum)
      const defaultSite2 = this.defaultSite ? this.defaultSite : -floatMath.numDiv(this.offset, 2) // 这里更改初始位置
      // for (let i = 0; i < this.slotsElm.length; i++) {
      //   this.oldOffset.push(defaultSite2)
      // }
      this.slotsElm.forEach(element => {
        this.oldOffset.push(defaultSite2)
        this.andOffset.push(0)
      })
      // console.log(this.slotsElm, this.oldOffset)
      for (let i = 0; i < this.slotsElm.length; i++) {
        this.slotsElm[i].elm.style.transitionDuration = this.speekSet[i] ? this.speekSet[i] + 'ms' : '1000ms'
        this.slotsElm[i].elm.style.backgroundPositionY = this.newOffset[i] ? -this.newOffset[i] + 'px' : -defaultSite2 + 'px'
      }
    },
    toRoll (idxArr) {
      console.log(idxArr)
      this.running = false
      for (let i = 0; i < idxArr.length; i++) {
        let offsetRem = floatMath.numMulti(this.offset, (idxArr[i] - 1))
        let toChange = floatMath.numAdd(floatMath.numAdd(floatMath.numMulti(this.circleHeight, this.runCount), this.oldOffset[i]), floatMath.numAdd(offsetRem, this.andOffset[i]))
        this.$set(this.newOffset, i, toChange)
        this.$set(this.oldOffset, i, this.newOffset[i])
        this.$set(this.andOffset, i, floatMath.numSub(this.circleHeight, offsetRem))
        this.slotsElm[i].elm.style.transitionTimingFunction = 'ease-out'
        this.slotsElm[i].elm.style.backgroundPositionY = this.newOffset[i] ? -this.newOffset[i] + 'px' : -this.oldOffset[i] + 'px'
        // console.log(i, this.slotsElm[i].elm.style.backgroundPositionY, this.newOffset)
      }
      // console.log(this.circleHeight, this.oldOffset, this.newOffset)
    }
    // toContinue () {
    //   if (this.running) {
    //     return
    //   }
    //   this.running = true
    //   console.log(this.slotsElm)
    //   this.timer = setInterval(() => {
    //     console.log(11)
    //     if (this.running) {
    //       for (let i = 0; i < this.slotsElm.length; i++) {
    //         const rollCircle = floatMath.numAdd(this.circleHeight, this.oldOffset[i])
    //         this.$set(this.newOffset, i, rollCircle)
    //         this.$set(this.oldOffset, i, this.newOffset[i])
    //         this.slotsElm[i].elm.style.animationTimingFunction = 'infinite'
    //         this.slotsElm[i].elm.style.animationDuration = '900ms'
    //         this.slotsElm[i].elm.style.backgroundPositionY = -this.newOffset[i] + 'px'
    //         console.log(this.oldOffset, this.circleHeight, this.newOffset)
    //       }
    //     } else {
    //       clearInterval(this.timer)
    //       this.timer = null
    //     }
    //   }, 900)
    // }
  }
}
</script>

<style lang="scss" scoped>
.luck-prize{
  width:100%;
  height: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
  justify-content: space-around;
  // background: url('../../assets/tiger_bottom.png') no-repeat;
  // background-size: 100% 100%;
}
// .game-item{
//   height: 100%;
//   width: 33.3%;
//   padding: 0 22px;
//   &>div{
//     height: 100%;
//     background-image: url(../../assets/gift_card2.png);
//     background-size: 100% 2128px;
//     background-repeat: repeat-y;
//     transition-delay: 200ms;
//   }
// }
</style>
