const request = require('request')
const {getAll} = require('./rc')
const downLoadGit = require('download-git-repo')
const {DOWNLOAD} = require('./constants')
let fetch = async(url)=>{
  return new Promise((resolve,reject)=>{
    let config = {
      url,
      method:'get',
      headers:{
        'user-agent':'xxx'
      }
    }
    request(config,(err,response,body)=>{
      if(err){
        reject(err)
      }
      resolve(JSON.parse(body))
    })
  })
}
const repoList = async()=>{
  let config = await getAll();
  let api = `https://api.github.com/${config.type}/${config.registry}/repos`
  return await fetch(api)
}
const tagList = async(projectName)=>{
  let config = await getAll();
  let api = `https://api.github.com/repos/${config.registry}/${projectName}/tags`
  console.log(api)
  return await fetch(api)
}
const download = async(src,dest)=>{
  return new Promise((resolve,reject)=>{
    downLoadGit(src,dest,(err)=>{
      if(err){
        reject(err)
      }
      resolve()
    })
  })
}
const downloadLocal = async(project,version)=>{
  let conf = await getAll();
  let api = `${conf.registry}/${project}`
  if(version){
    api+= `#${version}`
  }
  return await download(api,DOWNLOAD+'/'+project)
}
module.exports = {
  repoList,
  tagList,
  download,
  downloadLocal
}