import request from '@/utils/request'

// 测试接口
export function posttest(data) {
    return request({
        url: '/api/user/addUser',
        method: 'post',
        data: data
    })
}
export function gettest(pramas) {
    return request({
        url: '/api/user/addUser',
        method: 'get',
        data: pramas
    })
}
export function getall(pramas) {
    return request({
        url: '/api',
        method: 'get',
        data: pramas
    })
}