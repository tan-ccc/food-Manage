import request from '@/utils/request'
export function gettest(data) {
    return request({
        url: '/api/upload',
        method: 'post',
        data: data
    })
}