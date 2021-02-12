import request from '@/utils/request'

// 用户登录
export function signIn(data) {
    return request({
        url: '/api/user/login',
        method: 'post',
        data: data
    })
}
// 用户修改资料
export function edituser(data) {
    return request({
        url: '/api/user/edit',
        method: 'put',
        data: data
    })
}
// 用户退出登录
export function signOut() {
    return request({
        url: '/user/signOut',
        method: 'post',
        data: params
    })
}