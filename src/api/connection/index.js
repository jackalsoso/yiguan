import http from '../../utils/http'
import BASEURL from '@/config/index'

export default {
  // ------------------------------------------------搜索
  // serch (params) {
  //   return http.post(`${BASEURL}/group/groupList`,params);//获取群列表
  // },
  //-------------------------------------------------------------------------------- 群组
  groupList (params) {
    return http.post(`${BASEURL}/group/groupList`,params);//获取群列表
  },
  logOut (params) {
    return http.post(`${BASEURL}/group/quitGroup`,params);//退群、管理员踢人
  },
  person (params) {
    return http.post(`${BASEURL}/group/memberList`,params);//获取群成员列表
  },
  createGroup (params) {
    return http.post(`${BASEURL}/group/createGroup`,params);//创建群
  },
  editGroupMember (params) {
    return http.post(`${BASEURL}/group/editGroupMember`,params);//修改群成员信息
  },
  groupinfo (params) {
    return http.post(`${BASEURL}/group/getGroup`,params);//获取单个群信息
  },
  updateGroup (params) {
    return http.post(`${BASEURL}/group/setGroup`,params); //修改群信息
  },
  // -----------------------------------------------------------------------------------好友
  accountData (params) {
    return http.post(`${BASEURL}/friend/friendList`,params);//获取好友列表
  },
  getInfo (params) {
    return http.post(`${BASEURL}/member/getMember`,params);//获取好友信息
  },
  education () {
    return http.post(`${BASEURL}/education/getList`);//获取好友学历
  },
  updateInfo (params) {
    return http.post(`${BASEURL}/friend/savefriend`,params);//获取好友学历
  },
  // ------------------------------------------------------------------------------------附近人
  nearbyList (params) {
    return http.post(`${BASEURL}/member/nearbyMember`,params);//获取附近好友列表
  },
  getfriendReques (params) {
    return http.post(`${BASEURL}/friend/checkList`,params);//获取好友申请列表
  },
  checkFriend (params) {
    return http.post(`${BASEURL}/friend/checkFriend`,params);//是否同意好友申请
  },
  addFriend (params) {
    return http.post(`${BASEURL}/friend/addFriend`,params);//添加好友
  },
  deleteList (params) {
    return http.post(`${BASEURL}/friend/delFriend`,params);//删除好友
  },
  // --------------------------------------------------------------------------------------动态
  upload (params) {
    return http.post(`${BASEURL}/upload/index`,params);//上传文件
  },
  publish (params) {
    return http.post(`${BASEURL}/trends/release`,params);//发布动态
  },
  trendsComment (params) {
    return http.post(`${BASEURL}/trends/trendsComment`,params);//动态评论
  },
  trends (params) {
    return http.post(`${BASEURL}/trends/trends`,params);//获取动态
  },
  likes (params) {
    return http.post(`${BASEURL}/trends/trendsLike`,params);//获取动态
  },
}