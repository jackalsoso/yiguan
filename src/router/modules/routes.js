import login from '@/pages/login/index'

const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
    meta: {
      title: '启动页',
      keepAlive: false
    }
  },



]

export default routes;
