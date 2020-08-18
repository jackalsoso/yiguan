let BASEURL= ""; 

switch (process.env.NODE_ENV) {
    case 'development':
      BASEURL = ""  //开发环境url
      break;
    case 'production':
      BASEURL = ""   //生产环境url
      break;
}

export default BASEURL;
