import store from '../store'
import { getMenuAdmin, getMenuOrdinary } from '@/api/menu'

// 处理后端返回的 `component` 路径，拼装实现懒加载
export function loadView(path) {
    return () => import(`@/views/${path}`);
}

// 递归处理每一项 `component` 中的路径
export function dynamicRouter(view) {
    if (view.component) view.component = loadView(view.component)
    if (view.children) view.children.map(item => dynamicRouter(item))
    return view
}

// 添加动态路由，`{ path: '*', redirect: '/404' }` 防止页面刷新，静态路由丢失问题
export function adminUser(router) {
    getMenuAdmin().then(res => {
        store.commit('setMenuData', res.data)
        router.addRoutes([dynamicRouter(res.data), { path: '*', redirect: '/404' }])
    }).catch(() => { })
}

// 添加动态路由，`{ path: '*', redirect: '/404' }` 防止页面刷新，静态路由丢失问题
export function ordinaryUser(router) {
    getMenuOrdinary().then(res => {
        store.commit('setMenuData', res.data)
        router.addRoutes([dynamicRouter(res.data), { path: '*', redirect: '/404' }])
    }).catch(() => { })
}