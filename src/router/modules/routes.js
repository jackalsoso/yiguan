import activityHome from '@/pages/teacherActivity/home/index'
import booksHome from '@/pages/books/home/index'
import socialContact from '@/pages/connection/socialContact/index'

const routes = [
  {
    path: '/activityHome',
    name: 'activityHome',
    component: activityHome,
    meta: {
      title: '师资活动',
      keepAlive: false
    }
  },
  {
    path: '/activity/:detailId',
    name: 'activityDetails',
    component: () => import('@/pages/teacherActivity/activityDetails/index'),
    meta: {
      title: '活动详情',
      keepAlive: false
    }
  },
  {
    path: '/moreList',
    name: 'moreList',
    component: () => import('@/pages/moreList/index'),
    meta: {
      title: '更多活动列表',
      keepAlive: false
    }
  },
  {
    path: '/studentList',
    name: 'studentList',
    component: () => import('@/pages/teacherActivity/studentList/index'),
    meta: {
      title: '学员列表',
      keepAlive: false
    }
  },
  {
    path: '/student/:detailId',
    name: 'studentDetails',
    component: () => import('@/pages/teacherActivity/studentDetails/index'),
    meta: {
      title: '学员详情',
      keepAlive: false
    }
  },
  {
    path: '/product/:detailId',
    name: 'productDetail',
    component: () => import('@/pages/teacherActivity/productDetails/index'),
    meta: {
      title: '作品详情',
      keepAlive: false
    }
  },
  {
    path: '/teacher/:detailId',
    name: 'teacherDetails',
    component: () => import('@/pages/teacherActivity/teacherDetails/index'),
    meta: {
      title: '大师课详情',
      keepAlive: false
    }
  },
  {
    path: '/booksHome',
    name: 'booksHome',
    component: booksHome,
    meta: {
      title: '书籍',
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
    path: '/books/:detailId',
    name: 'booksDetails',
    component: () => import('@/pages/books/booksDetails/index'),
    meta: {
      title: '书籍详情',
      keepAlive: false
    }
  },
  {
    path: '/moreClassify',
    name: 'moreClassify',
    component: () => import('@/pages/moreClassify/index'),
    meta: {
      title: '更多分类',
      keepAlive: false
    }
  },
  {
    path: '/moreBooks',
    name: 'moreBooks',
    component: () => import('@/pages/moreBooks/index'),
    meta: {
      title: '更多推荐书籍',
      keepAlive: false
    }
  },
  {
    path: '/moreRank',
    name: 'moreRank',
    component: () => import('@/pages/moreRank/index'),
    meta: {
      title: '更多畅销书排行榜',
      keepAlive: false
    }
  },
  {
    path: '/socialContact',
    name: 'socialContact',
    component: socialContact,
    meta: {
      title: '社交',
      keepAlive: false
    }
  },
  {
    path: '/goodsInfo',
    name: 'goodsInfo',
    component: () => import('@/pages/connection/goodsInfo/goodsInfo'),
    meta: {
      title: '好友信息',
      keepAlive: false
    }
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/pages/connection/chat/chat'),
    meta: {
      title: '聊天',
      keepAlive: false
    }
  },
  {
    path: '/moreChat',
    name: 'moreChat',
    component: () => import('@/pages/connection/moreChat/moreChat'),
    meta: {
      title: '聊天',
      keepAlive: false
    }
  },
  {
    path: '/setgroupWhat',
    name: 'setgroupWhat',
    component: () => import('@/pages/connection/setgroupWhat/setgroupWhat'),
    meta: {
      title: '聊天详情',
      keepAlive: false
    }
  },
  {
    path: '/addmoreChat',
    name: 'addmoreChat',
    component: () => import('@/pages/connection/addmoreChat/addmoreChat'),
    meta: {
      title: '选择好友',
      keepAlive: false
    }
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import('@/pages/connection/publish/publish'),
    meta: {
      title: '发布动态',
      keepAlive: false
    }
  },



]

export default routes;
