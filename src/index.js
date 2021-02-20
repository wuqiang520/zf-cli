
import {betterRequire} from './utils/common'
import {resolve} from 'path'
// 命令行命令拿到后，这里是主流程控制
let apply = (action,...args)=>{
  console.log(action,args)
  betterRequire(resolve(__dirname,`./${action}`))(...args)

}
export default apply