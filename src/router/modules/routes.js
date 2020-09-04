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
    path: '/nochangeD',
    name: 'nochangeD',
    component: () => import('@/pages/threeD/nochangeD'),
    meta: {
      title: '发布之后3D视角查看',
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
      title: '关注的人/我的',
      keepAlive: false
    }
  },
  {
    path: '/dataEditing',
    name: 'dataEditing',
    component: () => import('@/pages/focusPersonal/dataEditing'),
    meta: {
      title: '我的编辑',
      keepAlive: false
    }
  },
  {
    path: '/myFans',
    name: 'myFans',
    component: () => import('@/pages/focusPersonal/myFans'),
    meta: {
      title: '我的粉丝',
      keepAlive: false
    }
  },
  {
    path: '/myFollow',
    name: 'myFollow',
    component: () => import('@/pages/focusPersonal/myFollow'),
    meta: {
      title: '我的关注',
      keepAlive: false
    }
  },
  {
    path: '/myHistory',
    name: 'myHistory',
    component: () => import('@/pages/focusPersonal/myHistory'),
    meta: {
      title: '我的历史',
      keepAlive: false
    }
  },
  {
    path: '/myShen',
    name: 'myShen',
    component: () => import('@/pages/focusPersonal/myShen'),
    meta: {
      title: '我的审核',
      keepAlive: false
    }
  },
  {
    path: '/myHelp',
    name: 'myHelp',
    component: () => import('@/pages/focusPersonal/myHelp'),
    meta: {
      title: '我的帮助',
      keepAlive: false
    }
  },
  {
    path: '/myOption',
    name: 'myOption',
    component: () => import('@/pages/focusPersonal/myOption'),
    meta: {
      title: '我的设置',
      keepAlive: false
    }
  },
  {
    path: '/myHelpmsg',
    name: 'myHelpmsg',
    component: () => import('@/pages/focusPersonal/myHelpmsg'),
    meta: {
      title: '我的帮助-内容',
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
  {
    path: '/webgl',
    name: 'webgl',
    component: () => import('@/pages/webgl/index'),
    meta: {
      title: 'webgl',
      keepAlive: false
    }
  },
  {
    path: '/share',
    name: 'share',
    component: () => import('@/pages/share/index'),
    meta: {
      title: '分享',
      keepAlive: false
    }
  },
]

export default routes;
