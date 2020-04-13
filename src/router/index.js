import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},

{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},

{
  path: '/',
  component: Layout,
  redirect: '/notice',
  children: [{
    path: 'notice',
    name: 'Notice',
    component: () => import('@/views/notice/index'),
    meta: {
      title: '公告管理',
      icon: 'notice'
    }
  }]
},
{
  path: '/goods',
  component: Layout,
  redirect: '/goods/index',
  name: 'Goods',
  meta: {
    title: '商品管理',
    icon: 'goods'
  },
  children: [{
    path: 'index',
    name: 'Index',
    component: () => import('@/views/goods/index'),
    meta: {
      title: '商品管理',
      icon: 'goods'
    }
  },
  {
    path: '/userImport',
    name: 'UserImport',
    component: () => import('@/views/goods/userImport/index'),
    meta: {
      title: '批量导入',
      icon: 'notice'
    },
    hidden: true
  },
  {
    path: '/createGoods',
    name: 'createGoods',
    component: () => import('@/views/goods/createGoods/index'),
    meta: {
      title: '增加商品',
      icon: 'notice'
    },
    hidden: true
  }
  ]
},
{
  path: '/order',
  component: Layout,
  children: [{
    path: 'index',
    name: 'Order',
    component: () => import('@/views/order/index'),
    meta: {
      title: '订单管理',
      icon: 'order'
    }
  }]
},
{
  path: '/user',
  component: Layout,
  children: [{
    path: 'index',
    name: 'User',
    component: () => import('@/views/user/index'),
    meta: {
      title: '用户管理',
      icon: 'user'
    }
  }]
},
{
  path: '/comment',
  component: Layout,
  children: [{
    path: 'index',
    name: 'Comment',
    component: () => import('@/views/comment/index'),
    meta: {
      title: '评论管理',
      icon: 'comment'
    }
  }]
},
{
  path: '/swiper',
  component: Layout,
  children: [{
    path: 'index',
    name: 'Swiper',
    component: () => import('@/views/swiper/index'),
    meta: {
      title: '轮播图管理',
      icon: 'swipers'
    }
  }]
},
{
  path: '/atlas',
  component: Layout,
  redirect: '/atlas/index',
  name: 'Atlas',
  meta: {
    title: '图集管理',
    icon: 'goods'
  },
  children: [{
    path: 'index',
    name: 'Atlas',
    component: () => import('@/views/atlas/index'),
    meta: {
      title: '图集管理',
      icon: 'atlas'
    }
  },
  {
    path: '/addAtlas',
    name: 'AddAtlas',
    component: () => import('@/views/atlas/addAtlas/index'),
    meta: {
      title: '新增图集',
      icon: ''
    },
    hidden: true
  },
  {
    path: '/editAtlas',
    name: 'EditAtlas',
    component: () => import('@/views/atlas/editAtlas/index'),
    meta: {
      title: '编辑图集',
      icon: ''
    },
    hidden: true
  }
  ]
},
{
  path: '/center',
  component: Layout,
  children: [{
    path: 'index',
    name: 'Center',
    component: () => import('@/views/center/index'),
    meta: {
      title: '个人中心',
      icon: 'center'
    }
  }]
},

// 404 page must be placed at the end !!!
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
