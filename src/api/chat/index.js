import http from '../../utils/http'
import BASEURL from '@/config/index'

export default {
  getChatHistory(params) {
    return http.post(`${BASEURL}/msg_log/chat_log`,params);
  },
  getMoreChatHistory(params) {
    return http.post(`${BASEURL}/msg_log/group_chat_log`,params);
  },
  upload (params) {
    return http.post(`${BASEURL}/upload/index`,params);//上传文件
  },
  relation (params) {
    return http.post(`${BASEURL}/msg_log/relation`,params);
  },

}