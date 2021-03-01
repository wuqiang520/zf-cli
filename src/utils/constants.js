const {version} =  require('../../package.json');

const VERSION = version;

// 找到用户的根目录
const HOME = process.env[process.platform === 'win32'?'USERPROFILE':'HOME']
const RC = `${HOME}/.zfclirc`
// RC配置下载（模板）的地方 给github的api来用
const DEFAULTS = {
  registry: 'wuqiang520',
  type:'users'  //users|orgs
}
// 下载目录(缓存目录)
const DOWNLOAD = `${HOME}/.zf-template`;



module.exports = {
  VERSION,
  RC,
  DEFAULTS,
  DOWNLOAD
}