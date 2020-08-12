# luck-roll
老虎机滚动形式抽奖

# 安装
```bash
npm i luck-roll -S
yarn add luck-roll
```

# 引入
```javascript
/** 引入 */
import { luckRoll, luckPrize } from 'luck-roll'
import 'luck-roll/dist/luck-roll.min.css'
```
# demo

### [在线demo page预览](https://weitingGao.github.io/luck-roll/dist/index.html)

```html
<template>
  <div class="demo-dialSudoku">
    <luck-roll>
      <div class="game-wrap">
        <luck-prize ref="lottery" :speekSet="speekSet" :total="total" :awardNum="awardNum">
          <div class="game-item" v-for="(item, index) in speekSet" :key="index">
          </div>
        </luck-prize>
      </div>
    </luck-roll>
    <button class="toLottery" @click="toLottery()">随机</button>
    <button class="toLottery" @click="toLottery(4)">指定奖品</button>
  </div>
</template>
```
```javascript
import { luckRoll, luckPrize } from '@/components/luck-roll'
export default {
  name: 'demo-dialSudoku',
  data () {
    return {
      speekSet: [1500, 1800, 2000], // 设置滚动速度
      total: 2128, // 奖品图总长度
      awardNum: 12 // 奖品图奖品个数
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
    getArr (n1) { // 生成随机数
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
```
```scss
  .game-wrap{
    margin:auto;
    width: 566px;
    height:306px;
    overflow: hidden;
    background-image: url('../assets/tiger_bottom.png'); // 背景图片【必须】
    background-repeat:no-repeat;
    background-size: 100% 100%;
  }
  .game-item{
    height: 100%;
    width: 33.3%;
    background-image: url('../assets/gift_card2.png'); // 奖品图片【必须】
    background-size: 80% 2128px; // 高度必须正确且与参数total一致【必须】
    background-position: top center;
    background-repeat: repeat-y; // 重要设置【必须】
    transition-delay: 200ms;
  }
```
## luck-prize

> Prop

| 名称        | 说明   |  类型  | 默认值 |
| --------   | -----:  | :----:  | :----:  |
| total     | 奖品图总长度|   Number  | 0 |
| awardNum   |   一列奖品图奖品数	  |  Number  | 0 |
| speekSet     |    滚动速度	    |  Array  | [1500, 1800, 2000] |
| defaultSite    |   初始位置   |  String  | '' |
| runCount    |   滚动圈数   |  Number  | 1 |

> Event

| 名称        | 说明   |  回调参数  |
| --------   | -----:  | :----:  |
|      | 	 |     |

> function

| 名称        |  说明   |  参数  |  回调参数  |
| --------   |  :----:  | :-----:  | :----:  |
| toRoll     |  抽奖	 | 奖品下标index数组 | - |
| init     |  初始化	 | 内部会自动调用一次 | - |

