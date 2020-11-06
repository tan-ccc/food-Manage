import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from '@/router/routes'
import { getSession, clearSession } from '@/utils/storage'

// 解决 `element ui` 导航栏重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
Vue.use(VueRouter)

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'vue-admin-wonderful'
  NProgress.configure({
    showSpinner: false,
  })
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
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.configure({
    showSpinner: false,
  })
  NProgress.done()
})

export default router
