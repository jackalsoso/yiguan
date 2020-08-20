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
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('@/pages/gallery/index'),
    meta: {
      title: '选择画廊',
      keepAlive: false
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/pages/search/index'),
    meta: {
      title: '搜索',
      keepAlive: false
    }
  },
  {
    path: '/gallery/:id',
    name: 'galleryDetail',
    component: () => import('@/pages/galleryDetail/index'),
    meta: {
      title: '画廊',
      keepAlive: false
    }
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('@/pages/upload/index'),
    meta: {
      title: '上传作品',
      keepAlive: false
    }
  },



]

export default routes;
