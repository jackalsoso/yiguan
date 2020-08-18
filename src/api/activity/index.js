import http from '../../utils/http'
import BASEURL from '@/config'

export default {
  activityList(params) {
    return http.post(`${BASEURL}/activity/activitylist`,params);
  },
  
}