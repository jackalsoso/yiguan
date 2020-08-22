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
  {
    path: '/batchDel',
    name: 'batchDel',
    component: () => import('@/pages/upload/batchDel'),
    meta: {
      title: '批量删除',
      keepAlive: false
    }
  },
  {
    path: '/productEdit',
    name: 'productEdit',
    component: () => import('@/pages/upload/edit'),
    meta: {
      title: '画作编辑',
      keepAlive: false
    }
  },
  {
    path: '/showGallery',
    name: 'showGallery',
    component: () => import('@/pages/showGallery/index'),
    meta: {
      title: '上传的画廊',
      keepAlive: false
    }
  },
  {
    path: '/editDetail',
    name: 'editDetail',
    component: () => import('@/pages/editDetail/index'),
    meta: {
      title: '编辑详情',
      keepAlive: false
    }
  },
  {
    path: '/publishLink',
    name: 'publishLink',
    component: () => import('@/pages/publishLink/index'),
    meta: {
      title: '发布链接',
      keepAlive: false
    }
  },
  {
    path: '/publishSuccess',
    name: 'publishSuccess',
    component: () => import('@/pages/publishSuccess/index'),
    meta: {
      title: '发布链接成功',
      keepAlive: false
    }
  },
  {
    path: '/browse',
    name: 'browse',
    component: () => import('@/pages/browse/index'),
    meta: {
      title: '正常浏览',
      keepAlive: false
    }
  },
  {
    path: '/focusPersonal',
    name: 'focusPersonal',
    component: () => import('@/pages/focusPersonal/index'),
    meta: {
      title: '关注的人',
      keepAlive: false
    }
  },
  {
    path: '/focusWorks',
    name: 'focusWorks',
    component: () => import('@/pages/focusWorks/index'),
    meta: {
      title: '点进一张的作品',
      keepAlive: false
    }
  },
  {
    path: '/focusInfor',
    name: 'focusInfor',
    component: () => import('@/pages/focusInfor/index'),
    meta: {
      title: '关注的人-主页',
      keepAlive: false
    }
  },
  {
    path: '/fansList',
    name: 'fansList',
    component: () => import('@/pages/fansList/index'),
    meta: {
      title: '粉丝-关注',
      keepAlive: false
    }
  },
  



]

export default routes;
