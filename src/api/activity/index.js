import http from '../../utils/http'
import BASEURL from '@/config'
import md5 from 'js-md5';

// 生成签名
const appId = '1';
const appSecret = 'l3A44xNwuZ8';
let creatSign = () => {
  let time = (new Date()).getTime()
  let sign = md5(appSecret + ',' + time).toLowerCase()
  return `?t=${time}&p=${appId}&s=${sign}`
}
// 拼接参数
let combineParams = (params) => {
  return params ? `${creatSign()}&<=${params}` : creatSign()
}

export default {
  member(params) {
    return http.get(`${BASEURL}/O/member${combineParams(params)}`);
  },
  login(params) {
    return http.get(`${BASEURL}/C/login${combineParams(params)}`);
  },
  entryCats(params) {
    return http.get(`${BASEURL}/entry/cats${combineParams(params)}`);
  },
}