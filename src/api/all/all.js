import request from '@/utils/request'
export function gettest(data) {
    return request({
        url: '/api/upload',
        method: 'post',
        data: data
    })
}
export function getgoods(params) {
    return request({
        url: '/api/goods',
        method: 'get',
        params
    })
}
export function addGoods(data) {
    return request({
        url: '/api/goods/addGoods',
        method: 'post',
        data: data
    })
}