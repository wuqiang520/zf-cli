import program from 'commander'
import {VERSION} from './utils/constants'
import main from './index'
import "babel-polyfill"
// zf-cli config
// zf-cli install
let actionMap = {
  install: {
    alias: 'i',
    description: 'install templete',
    examples: [
      'zf-cli i',
      'zf-cli install'
    ]
  },
  config:{
    alias: 'c',
    description: 'config .zfclirc',
    examples: [
      'zf-cli config set <key> <value>',
      'zf-cli config get <key>',
      'zf-cli config remove <key>'
    ]
  },
  '*':{
    alias:'',
    description: 'not found',
    examples:[]
  }
}
Object.keys(actionMap).forEach(action=>{
  program
  .command(action)
  .alias(actionMap[action].alias)
  .description(actionMap[action].description)
  .action(function(cmd, options){
    //判断当前操作
    if(action === 'install' || action === 'i'){
      main(action)
    }else if(action === 'config'){
      //实现可以更改配置文件
      main(action,...process.argv.slice(3))
    }
    console.log(action)
  });
})

function help(){
  console.log('Examples:')
  Object.keys(actionMap).forEach(action=>{
    actionMap[action].examples.forEach(example=>{
      console.log('  - '+example)
    })
  })
}
program.on('-h',help)
program.on('--help',help)
program.version(VERSION,'-v --version').parse(process.argv)