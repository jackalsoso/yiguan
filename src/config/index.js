let BASEURL = "";

switch (process.env.NODE_ENV) {
  case "development":
    BASEURL = "/api"; //开发环境url
    break;
  case "production":
    BASEURL = "http://plt.yiyiny.com/api"; //生产环境url
    break;
}

export default BASEURL;