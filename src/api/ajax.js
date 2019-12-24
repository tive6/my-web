import axios from 'axios'
import store from './../store'
// import qs from 'querystring'
import { Dialog } from 'vant'

const instance = axios.create({
    timeout: 60000
})

// instance.default.headers.post['Content-Type'] = ''

// 不重定向白名单
const whiteList = [
    '/Employee/GetCurrentLoginUser',
    '/nbi/auth/token',
]

// request拦截器
instance.interceptors.request.use(config => {
    // console.log(config)
    let url = config.url
    if (whiteList.includes(url)) {
        // console.log(1)
    } else {
        // 需要 token
        let token = store.state.User.token
        // console.log(token)
        if (token.toString().trim()==='') {
            return Promise.reject(new Error('token为空！'))
        } else {
            config.headers['access-token'] = token
        }
    }
    return config
}, error => {
    console.log(error)
    return Promise.reject(error)
})

// respone拦截器
instance.interceptors.response.use(response => {
    // console.log(response)
    // returncode为非10000时抛错,可结合自己业务进行修改
    const res = response.data
    let code = res.Status!==undefined ? res.Status : res.code
    if (code+'' !== '0') {
        // 4045:Token 过期
        Dialog.confirm({
            // title: '标题',
            message: '接口服务异常',
            confirmButtonText: '刷新',
            showCancelButton: false,
            showConfirmButton: false,
            closeOnPopstate: true,
        }).then(() => {
            // this.$router.go(0)
            window.location.reload()
        })
        return Promise.reject(new Error(`url=>【${response.config.url}】、code=>【${code}】接口返回异常`))
    } else {
        return response
    }
},
error => {
    Dialog.confirm({
        // title: '标题',
        message: '接口服务异常',
        confirmButtonText: '刷新',
        showCancelButton: false,
        showConfirmButton: false,
        closeOnPopstate: true,
    }).then(() => {
        // this.$router.go(0)
        window.location.reload()
    })
    console.log(error)
    return Promise.reject(error)
})

export const ajax = (opts={})=>{
    return new Promise((resolve, reject) => {
        let hasUp = opts.hasUp
        let url = ''
        if (hasUp) {
            url = (opts.method && opts.method==='POST') ? opts.url : `${opts.url}?appVersion=4.0&cookieName=mmp-3244xx32234sdf&cookieValue=cKxyoJ5bd3zxevlgA1sTXC2phNoB6uYFNjgYyJCHnsQzqBe8RDW/00nRXWX7JJrtY2XmKpWZvqKE5CT9wDclkJjXRXeMM0YVx3f2dcWXnxdbvwUoDK6fYThRVpfNE97ZyDCxzSKjhCY%3D&date=2019-08-05&deviceId=6115c6271b0640a1a3f80d59bb84583b&hardWareModel=iPhone%207%20Plus&ip=192.168.178.14&mac=02%3A00%3A00%3A00%3A00%3A00&netType=WIFI&os=iOS&osVersion=12.3.1&sign=18A4E58519E9C4443B81C87B7C4CCF8F5DE5791C&style=0`
        } else {
            url = opts.url
        }
        let callback = opts.callback
        // let params = (typeof opts.params === 'object' && Object.keys(opts.params).length>0)
        instance({
            url: url,
            method: opts.method || 'GET',
            headers: Object.assign(
                { 'content-type': 'application/json' },
                opts.headers
            ),
            data: opts.data,
            params: opts.params,
            // params: {
            //     appVersion: '4.0',
            //     cookieName: 'mmp-3244xx32234sdf',
            //     cookieValue: 'cKxyoJ5bd3zxevlgA1sTXC2phNoB6uYFNjgYyJCHnsQzqBe8RDW/00nRXWX7JJrtY2XmKpWZvqKE5CT9wDclkJjXRXeMM0YVx3f2dcWXnxdbvwUoDK6fYThRVpfNE97ZyDCxzSKjhCY%3D',
            // },
        }).then( res =>{
            // console.log(res)
            callback && callback(res)
            if (hasUp) {
                let d = res.data.code === 0 && res.data || {}
                // Promise.reject('error')
                resolve(d)
            } else {
                let data = res.data.records || res.data.Result
                resolve(data)
            }
        }).catch(e => {
            // console.log(e)
            reject(e)
        })
    })
}