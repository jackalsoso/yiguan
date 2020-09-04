import http from '../../utils/http'
import BASEURL from '@/config'

export default {
  activityList(params) {
    return http.post(`${BASEURL}/activity/activitylist`,params);
  },
  login(params) {
    return http.post(`${BASEURL}/entry/login`,params);
  },
  entryCats(params) {
    return http.get(`${BASEURL}/entry/cats`,params);
  },
}