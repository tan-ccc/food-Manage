import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { staticRoutes } from '@/router/routes'
import { getSession, clearSession } from '@/utils/storage'
import { adminUser, ordinaryUser } from '@/utils/routesAsync'

// 解决 `element ui` 导航栏重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

// 加载静态路由
const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: staticRoutes
})
const router = createRouter()


// 路由加载前
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'vue-admin-wonderful'
  NProgress.configure({ showSpinner: false })
  NProgress.start()
  let token = getSession('token')
  if (to.fullPath === '/login' && !token) {
    next()
  } else {
    if (!token) {
      next('/login')
      clearSession()
    } else if (token && to.fullPath === '/login') {
      next('/home')
    } else {
      // 动态加载后端返回路由路由(模拟数据)
      if (!getSession('userInfo')) return false
      if (Object.keys(store.state.menuData).length <= 0) {
        if (getSession('userInfo').userName === 'admin') adminUser(router)
        else if (getSession('userInfo').userName === 'test') ordinaryUser(router)
      }
      next()
    }
  }
})

// 路由加载后
router.afterEach(() => {
  NProgress.configure({ showSpinner: false })
  NProgress.done()
})

// 重置路由
export function resetRouter() {
  router.matcher = createRouter().matcher
}

// 导出路由
export default router
