import request from '@/utils/request'

// 用户登录
export function signIn(params) {
    request({
        url: '/user/signIn',
        methods: 'post',
        data: params
    })
}

// 用户退出登录
export function signOut() {
    request({
        url: '/user/signOut',
        methods: 'post',
        data: params
    })
}