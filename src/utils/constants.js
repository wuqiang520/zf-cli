import {version} from '../../package.json';

export const VERSION = version;

// 找到用户的根目录
const HOME = process.env[process.platform === 'win32'?'USERPROFILE':'HOME']
export const RC = `${HOME}/.zfclirc`
// RC配置下载（模板）的地方 给github的api来用
export const DEFAULTS = {
  registry: 'wuqiang520',
  type:'users'  //users|orgs
}
// 下载目录
export const DOWNLOAD = `${HOME}/.template`;