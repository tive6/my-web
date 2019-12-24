import Utils from '@/common/utils'
import { UserApi } from './../../api/index'
// console.log(process.env)
const isDev = process.env.NODE_ENV === 'development'

const USER_TOKEN = 'bi-user-token'
const GET_USER_TOKEN = 'GET_USER_TOKEN'
const GET_USER_INFO = 'GET_USER_INFO'

const User = {
	namespaced: true,

	state: {
		token: Utils.getCookie(USER_TOKEN),
		userInfo: {
			CnName: '测试文字',
			EmployeeNumber: '12345'
		}
	},
	getters: {
		getUserToken (state) {
			return state.token
		},
		getUserInfo (state) {
			return state.userInfo
		},
	},
	mutations: {
		GET_USER_TOKEN: (state, token) => {
			state.token = token
		},
		GET_USER_INFO: (state, userInfo) => {
			state.userInfo = userInfo
		},
	},
	actions: {
		async getUserToken ({ dispatch, commit, getters }) {
			// await dispatch('getUserInfo')
			try {
				!isDev && await dispatch('getUserInfo')
			} catch (e) {
				console.log(e)
			}
			return new Promise((resolve, reject) => {
				let username = ''
				if (isDev) {
					username = 'gaoxiaofeng'
				} else {
					username = getters.getUserInfo.DomainAccount || ''
				}
				// username = 'gaoxiaofeng'
				// console.log('【username】：', username)
				// if (!username) {
				// 	return reject('【vuex：】token为空！')
				// }
				UserApi.getUserToken({
					params: {
						username: username,
					}
				}).then(res => {
					// console.log('【token】：', res)
					Utils.setCookie(USER_TOKEN, res, {expires: 7})
					commit(GET_USER_TOKEN, res)
					resolve()
				}).catch((error) => {
					reject(error)
				})
			})
		},
		async getUserInfo ({ commit }) {
			return new Promise((resolve, reject) => {
				UserApi.getUserInfo().then(res => {
					commit(GET_USER_INFO, res)
					resolve()
				}).catch((error) => {
					reject(error)
				})
			})
		},
	}
}

export default User
