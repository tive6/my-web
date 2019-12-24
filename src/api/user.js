import { ajax } from './ajax'

export default {
    getUserInfo () {
        return ajax({
            url: '/Employee/GetCurrentLoginUser',
        })
    },
    getUserToken (opts, callback) {
        return ajax(Object.assign({
            url: '/nbi/auth/token',
        }, opts, {
            callback
        }))
    },
}