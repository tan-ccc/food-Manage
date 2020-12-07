import request from '@/utils/request'

// 用户登录
export function signIn(params) {
    request({
        url: '/user/signIn',
        method: 'post',
        data: params
    })
}

// 用户退出登录
export function signOut() {
    request({
        url: '/user/signOut',
        method: 'post',
        data: params
    })
}