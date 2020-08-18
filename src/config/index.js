let BASEURL= ""; 

switch (process.env.NODE_ENV) {
    case 'development':
      BASEURL = "http://shidu.nx.021dr.cn/api.php"  //开发环境url
      break;
    case 'production':
      BASEURL = "http://shidu.nx.021dr.cn/api.php"   //生产环境url
      break;
}

export default BASEURL;
