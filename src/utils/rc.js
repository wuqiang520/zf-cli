const {RC,DEFAULTS} = require('./constants')
const {encode,decode} = require('ini')
const {promisify} = require('util')
const fs = require('fs')
const exists = promisify(fs.exists)
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
// RC是配置文件 DEFAULTS是默认配置
const get = async(k)=>{
   let has = await exists(RC)
   let opts;
   if(has){
     opts = await readFile(RC,'utf8')
     opts = decode(opts)
     return opts[k]
   }
   return ''
}
const set = async(k,v)=>{
  let has = await exists(RC)
  let opts;
  if(has){
    opts = await readFile(RC,'utf8')
    opts = decode(opts)
    Object.assign(opts,{[k]:v});
  }else{
    opts = Object.assign(DEFAULTS,{[k]:v})
  }
  await writeFile(RC,encode(opts),'utf-8')
}
const remove = async(k)=>{
  let has = await exists(RC)
  let opts;
  if(has){
    console.log(2)
    opts = await readFile(RC,'utf8')
    console.log('opts',opts)
    opts = decode(opts)
    console.log('decode:',opts)
    delete opts[k]
    console.log('delete',opts)
    await writeFile(RC,encode(opts),'utf-8')
  }
}
const getAll = async()=>{
  let opts;
  opts = await readFile(RC,'utf8')
  opts = decode(opts)
  return opts
}
module.exports = {
  get,
  set,
  remove,
  getAll
}