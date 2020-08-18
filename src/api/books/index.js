import http from '../../utils/http'
import BASEURL from '@/config'

export default {
  article(params) {
    return http.post(`${BASEURL}/article/getIndexList`,params);
  },
  recom_more_art(params) {
    return http.post(`${BASEURL}/article/getMoreTopList`,params);
  },
  reward_more_art(params) {
    return http.post(`${BASEURL}/article/getMoreRewardList`,params);
  },
  origin_more_art(params) {
    return http.post(`${BASEURL}/article/getMoreOriginList`,params);
  },
  classify_more_art(params) {
    return http.post(`${BASEURL}/article/getClassArticleList`,params);
  },
  classify_more_list(params) {
    return http.post(`${BASEURL}/classify/articleClassPageList`,params);
  },
  books(params) {
    return http.post(`${BASEURL}/book/getIndexList`,params);
  },
  booksDetails(params) {
    return http.post(`${BASEURL}/book/getBookDetail`,params);
  },
  section(params) {
    return http.post(`${BASEURL}/book/getCatalogs`,params);
  },
  recommend(params) {
    return http.post(`${BASEURL}/book/getMoreTopList`,params);
  },
  reward(params) {
    return http.post(`${BASEURL}/book/getMoreRewardList`,params);
  },
  getRankList(params) {
    return http.post(`${BASEURL}/book/getMorePopularList`,params);
  },
  getRecordList(params) {
    return http.post(`${BASEURL}/book/getCatalogRecordings`,params);
  },
  applyLuzhi(params) {
    return http.post(`${BASEURL}/book/applyTranscribe`,params);
  },
  collect(params) {
    return http.post(`${BASEURL}/book/onstore`,params);
  },

}