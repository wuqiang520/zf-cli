const download = require('download-git-repo')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
let install = (name) => {
  if (!fs.existsSync(name)) {
    const spinner = ora('正在下载模板...');
    spinner.start();
    download('github:wuqiang520/hello-world', name, {
      clone: true
    }, (err) => {
      if (err) {
        spinner.fail();
        console.log(symbols.error, chalk.red(err));
      }else{
        spinner.succeed();
        const meta = {
          project: name
        }
        const fileName = `${name}/README.md`;
        if(fs.existsSync(fileName)){
          const content = fs.readFileSync(fileName).toString();
          const result = handlebars.compile(content)(meta);
          fs.writeFileSync(fileName, result);
        }
        console.log(symbols.success, chalk.green('项目初始化完成'));
        console.log(symbols.success, chalk.green('Successfully created project '+name));
        console.log(symbols.success, chalk.green('Get start width the following commands'));

        console.log(symbols.success, chalk.green('cd '+name));
        console.log(symbols.success, chalk.green('npm install'));
        console.log(symbols.success, chalk.green('npm run serve'));

        

      }
      
    })
  } else {
    // 错误提示项目已存在，避免覆盖原有项目
    console.log(symbols.error, chalk.red('项目已存在'));
  }


  //  download('direct:https://gitlab.tech.21cn.com/f2e-e/e-family.git',name,{clone: true},(err)=>{console.log(err?err:'Success')})

}

export default install