import request from '@/utils/request'

export function test(query) {
    return request({
        url: '/users/test',
        method: 'get',
        params: query
    })
}

export function testMQTT() {
    return request({
        url: '/users/testMQTT',
        method: 'get',
    })
}
  