import request from '@/utils/request'

// 获取用户信息
export function getUserInfo(params) {
    request({
        url: '/user/info',
        methods: 'get',
        params
    })
}