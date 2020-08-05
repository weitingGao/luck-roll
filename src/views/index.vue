<template>
  <div class="demo-dialSudoku">
    <luck-roll>
      <div class="game-wrap">
        <luck-prize ref="lottery" :speekSet="speekSet" :total=2128 :awardNum=12>
          <div class="game-item" v-for="(item, index) in speekSet" :key="index">
          </div>
        </luck-prize>
      </div>
    </luck-roll>
    <button class="toLottery" @click="toLottery()">随机</button>
    <button class="toLottery" @click="toLottery(4)">指定奖品</button>
  </div>
</template>

<script>
import { luckRoll, luckPrize } from '@/index'
// console.log(11111, luckRoll, luckPrize)
export default {
  name: 'demo-dialSudoku',
  data () {
    return {
      speekSet: [1500, 1800, 2000] // 设置滚动速度
    }
  },
  components: {
    [luckRoll.name]: luckRoll,
    [luckPrize.name]: luckPrize
  },
  methods: {
    toLottery (idx) {
      if (idx) {
        let arr = [2, 2, 2]
        this.$refs.lottery.toRoll(arr)
      } else {
        let n1 = parseInt(Math.random() * 12 + 1)
        let arr = this.getArr(n1)
        this.$refs.lottery.toRoll(arr)
        console.log(n1, arr)
      }
    },
    getArr (n1) {
      let n2 = parseInt(Math.random() * 12 + 1)
      let n3 = parseInt(Math.random() * 12 + 1)
      if (n1 === n2) {
        console.log('相同了')
        n2 === 1 ? n2 = n2 + 1 : n2 = n2 - 1
      }
      return [n1, n2, n3]
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.demo-dialSudoku {
  margin-top: 20px; // 40
  .toLottery{
    position: relative;
    width: 200px;
    height: 80px;
    display: block;
    margin:auto;
    margin-top: 30px;
    background-color: #f9b705;
  }
  .game-wrap{
    // display: flex;
    // justify-content: space-around;
    margin:auto;
    width: 566px;
    height:306px;
    overflow: hidden;
    background-image: url('../assets/tiger_bottom.png');
    background-repeat:no-repeat;
    background-size: 100% 100%;
    // padding-left: 30px;
  }
  .game-item{
    height: 100%;
    width: 33.3%;
    // padding: 0 22px;
    background-image: url('../assets/gift_card2.png');
    background-size: 80% 2128px;
    background-position: top center;
    background-repeat: repeat-y;
    transition-delay: 200ms;
  }
}
</style>
