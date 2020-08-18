import http from '../../utils/http'
import BASEURL from '@/config'

export default {
  activityList(params) {
    return http.post(`${BASEURL}/activity/activitylist`,params);
  },
  memberList() {
    return http.post(`${BASEURL}/member_works/fineMember`);
  },
  courselist(params) {
    return http.post(`${BASEURL}/course/courselist`,params);
  },
  activityDetail(params) {
    return http.post(`${BASEURL}/activity/detail`,params);
  },
  sendCode(params) {
    return http.post(`${BASEURL}/sms/into`,params);
  },
  applyActivity(params) {
    return http.post(`${BASEURL}/activity/enroll`,params);
  },
  product_list(params) {
    return http.post(`${BASEURL}/member_works/workslist`,params);
  },
  getUserInfo(params) {
    return http.post(`${BASEURL}/member/studentFind`,params);
  },
  productZan(params) {
    return http.post(`${BASEURL}/member_works/member_likes`,params);
  },
  productDetail(params) {
    return http.post(`${BASEURL}/member_works/detail`,params);
  },
  productComment(params) {
    return http.post(`${BASEURL}/member_works/send_comment`,params);
  },
  courseDetail(params) {
    return http.post(`${BASEURL}/course/get_teacher_course`,params);
  },
  teacherCourseDetail(params) {
    return http.post(`${BASEURL}/course/detail`,params);
  },
  courseZan(params) {
    return http.post(`${BASEURL}/course/member_likes`,params);
  },
  courseListDetail(params) {
    return http.post(`${BASEURL}/course/get_teacher_course_detail`,params);
  },
  courseComment(params) {
    return http.post(`${BASEURL}/course/send_comment`,params);
  },
  pay(params) {
    return http.post(`${BASEURL}/payment/into`,params);
  },

}