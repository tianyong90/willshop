import '../../sass/admin.scss'
import 'antd/dist/antd.css'
import axios from 'axios'
import adminConfig from './config'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

ReactDOM.render(<App />, document.getElementById('root'))

// // axios 请求发送前处理
// axios.interceptors.request.use(
//   config => {
//     store.commit('UPDATE_LOADING', true)
//
//     const token = window.localStorage.getItem(adminConfig.authTokenKey)
//     config.headers.Authorization = 'Bearer ' + token
//
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )
//
// // axios 得到响应后处理
// axios.interceptors.response.use(
//   response => {
//     store.commit('UPDATE_LOADING', false)
//
//     return response
//   },
//   error => {
//     store.commit('UPDATE_LOADING', false)
//
//     if (error.response) {
//       const newToken = error.response.headers.authorization
//       if (newToken) {
//         window.localStorage.setItem(
//           adminConfig.authTokenKey,
//           newToken.replace(/^bearer\s?/i, '')
//         )
//       }
//
//       if (error.response.status === 401) {
//         window.localStorage.removeItem(adminConfig.authTokenKey)
//
//         router.push('/login')
//       } else if (error.response.status === 403) {
//         // 无权限时统一提示
//         app.error('无操作权限')
//         return
//       }
//     } else {
//       // 请求超时提示
//       if (error.code === 'ECONNABORTED') {
//         app.error('请求超时，请重试')
//       }
//     }
//
//     return Promise.reject(error)
//   }
// )
