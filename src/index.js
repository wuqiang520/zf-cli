
const {betterRequire} = require('./utils/common')
const {resolve} = require('path')
// 命令行命令拿到后，这里是主流程控制
let apply = (action,...args)=>{
  betterRequire(resolve(__dirname,`commands/${action}`))(...args)
}

module.exports = apply