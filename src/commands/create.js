const download = require('download-git-repo')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
const {copy,exists} = require('../utils/copy');

const configList = (project) =>{
  return [
   {
    path:'README.MD',
    data:{
      project
    }
   },{
    path:'project.json',
    data:{
      project
    }
   } 
  ]
}
const create = (name) => {
  const list = configList(name)
  if(!fs.existsSync(name)){
    const spinner = ora('正在创建模板');
    spinner.start();
    exists('./template', name, copy, function(){
      spinner.succeed();
      list.forEach(item => {
        const templatePath = path.join(__dirname, '../../template',item.path)
        const targetPath = path.join(process.cwd(), name,item.path)
        const templateData = fs.readFileSync(templatePath).toString();
        const generateData = handlebars.compile(templateData)(item.data);
        fs.writeFileSync(targetPath,generateData)
      });
      console.log(symbols.success, chalk.green('Successfully created project '+name));
      console.log(symbols.success, chalk.green('Get start width the following commands'));
      console.log('cd '+name);
      console.log('npm install');
      console.log('npm run serve');
    })
  }else{
    console.log(symbols.error, chalk.red('项目已存在'))
  }
}

module.exports.default = create