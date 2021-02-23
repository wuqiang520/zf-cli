import {repoList,tagList,downloadLocal} from './utils/git'
import ora from 'ora'
import inquirer from 'inquirer'
let install = async() =>{
  // 下载模板 选择模板使用
  // 通过配置文件 获取模板信息（有哪些模板）
  let loading = ora('fetching template......')
  loading.start();
  let list = await repoList()
  loading.succeed();
  list = list.map(({name})=>name)
  console.log(list)
  let answer = await inquirer.prompt([
    {
      type:'list',
      name:'project',
      choices: list,
      questions:'please choice template'
    }
  ])
  //项目名字
  console.log(answer.project)
  let project = answer.project

  loading = ora('fetching tags......')

  loading.start();

  // 获取当前项目 版本号
  let tagLists = await tagList(project)
  loading.succeed();
  tagLists = tagLists.map(({name})=>name)
  let tag;
  if(tagLists.length>0){
    answer = await inquirer.prompt([
      {
        type:'list',
        name:'tag',
        choices: tagLists,
        questions:'please choice tag'
      }
    ])
    tag = answer.tag
  }else{
    tag = ''
  }
  
  console.log(answer.tag)
  // 下载文件（先下载到缓存文件中）
  // zf-cli init
  loading = ora('download project......')
  loading.start();
  await downloadLocal(project, tag)
  loading.succeed();


}
export default install;