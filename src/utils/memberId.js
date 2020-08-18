
const getMemberId = () => {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if(userInfo){
    return userInfo.member_id;
  }else{
    return 1;
  }
}

export default getMemberId;