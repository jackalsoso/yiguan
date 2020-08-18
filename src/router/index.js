import Vue from 'vue'
// import bus from '@/bus'
import Router from 'vue-router'
import routes from './modules/routes'
// import Cookie from '@/utils/cookie.js';
//import store from '@/vuex';

Vue.use(Router)

// 登录
//const Login = r => require(['@/pages/login'], r)

// 常量路由
// export const constantRoutes = [
//   {
//     path: '/login',
//     name:'Login',
//     component: Login,
//     meta: {
//       auth: true// true为不进行权限验证,false或不写默认进行验证
//     }
//   },
// ]
// 动态路由
// const router = new Router({
//   scrollBehavior:()=>({y:0}),
//   routes:constantRoutes
// })

const router = new Router({
	linkActiveClass:'active',
  routes: routes
})

// Vue.mixin({
//   beforeRouteEnter(to, from, next){
//     next(vm => {
//       bus.$on(`${to.path}pageRefresh`,() => {
//         vm.refresh && vm.refresh()
//       })
//     })
//   },
//   beforeRouteLeave(to, from, next){
//     bus.$off(`${from.path}pageRefresh`)
//     next();
//   }
// })

// 路由监听
//router.beforeEach((to, from, next) =>{
  // const token = Cookie.getCookie('token'), userInfo = sessionStorage.getItem(userInfo)
  // if(token){
  //   if(!store.state.user.systemDict){
  //     // store.state.user.getSystemDict({})
  //     store.dispatch('getSystemDict', {})
  //   }
  //   if(to.path === "/login"){
  //     next('/');
  //     return;
  //   }
  //   next()
  // }else{
  //   if(to.path !== "/login"){
  //     next('/login');
  //     return;
  //   }
  //   next()
  // }
//})
export default router;
