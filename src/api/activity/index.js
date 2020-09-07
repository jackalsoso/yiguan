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
  activityList(params) {
    return http.post(`${BASEURL}/activity/activitylist`, params);
  },
  login(params) {
    return http.get(`${BASEURL}/entry/login${combineParams(params)}`);
  },
  entryCats(params) {
    return http.get(`${BASEURL}/entry/cats`, params);
  },
  omember(params){
    return http.get(`${BASEURL}/entry/cfg`, params);
  }
}
