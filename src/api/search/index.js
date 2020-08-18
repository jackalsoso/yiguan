import http from '../../utils/http'
import BASEURL from '@/config/index'

export default {
  getHistory(params) {
    return http.post(`${BASEURL}/Wsearch/getHistoryKeywords`,params);
  },
  search(params) {
    return http.post(`${BASEURL}/Wsearch/getList`,params);
  },
  removeHistory(params) {
    return http.post(`${BASEURL}/Wsearch/delHistory`,params);
  },

}