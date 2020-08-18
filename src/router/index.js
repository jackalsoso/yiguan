import Vue from 'vue'
import Router from 'vue-router'
import routes from './modules/routes'

Vue.use(Router)

const router = new Router({
	linkActiveClass:'active',
  routes: routes
})

//授权登陆
// router.beforeEach((to, from, next) => {

// })

router.afterEach(() => {
  window.scrollTo(0,0);
})


export default router
