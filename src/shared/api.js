import axios from 'axios'

/* Axios 인스턴스 생성 */

const instance = axios.create({
  baseURL: 'http://52.78.155.185',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-type': 'application/json; charset=UTF-8',
    accept: 'application/json',
  },
})

/* Interceptor를 통한 Header 설정 */

instance.interceptors.request.use((config) => {
  const accessToken = document.cookie.split('=')[1]
  config.headers.common['authorization'] = `${accessToken}`
  return config
})

/* export api */

export const userApi = {
  login: () => instance.get('/api/user'),
  socialLogin: () => instance.get('/api/user/kakao/callback'),
  join: () => instance.post('/api/user'),
  userInfo: () => instance.get(`/api/userInfo`), // api 명세서 url userId 확인, 토큰으로 확인하는지?
  myPage: () => instance.get(`/api/mypage`), // api 명세서 url userId 확인, 토큰으로 확인하는지?
}

export const boardApi = {
  getPosts: () => instance.get('/api/board'),
  getOnePost: (postId) => instance.get(`/api/board/${postId}`),
  writePost: () => instance.post('/api/board'),
  editPost: (postId) => instance.put(`/api/board/${postId}`),
  deletePost: (postId) => instance.delete(`/api/board/${postId}`),
}

export const dictApi = {
  getDicts: () => instance.get('/api/dict'),
  writeDict: () => instance.post('/api/dict'),
  editDict: () => instance.put(`/api/dict`), // api 명세서 url dictId 확인
  dictEditHistory: (dictId) => instance.get(`/api/dict/${dictId}/history`),
  dictEditHistoryDetail: (historyId) => instance.get(`/api/dict/history/${historyId}`),
  rollbackDict: (historyId) => instance.get(`/api/dict/revert/${historyId}`),
}

export const quizApi = {
  // quiz api 명세서 없음 -> 확인 필요
}

export const mainApi = {
  mainPage: () => instance.get('/api/main'),
}
