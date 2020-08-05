import { version } from '../package.json'

import luckRollIndex from '@/components/luck-roll'
export default {
  version,
  ...luckRollIndex
}
export let luckRoll = luckRollIndex.luckRoll
export let luckPrize = luckRollIndex.luckPrize
