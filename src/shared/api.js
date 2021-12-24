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
  login: (username, password) => instance.post('/api/user', { username: username, password: password }),
  socialLogin: () => instance.get('/api/user/kakao/callback'),
  join: (username, nickname, password, passwordCheck) => instance.post('/api/signup', { username: username, nickname: nickname, password: password, passwordCheck: passwordCheck }),
  userInfo: () => instance.get(`/api/userInfo`),
  myPage: () => instance.get(`/api/mypage`),

  /* 추가 */
  checkUsername: (username) => instance.get(`/api/signup/username?username=${username}`),
  checkNickname: (nickname) => instance.get(`/api/signup/nickname?nickname=${nickname}`),
}

export const boardApi = {
  getPosts: () => instance.get('/api/board'),
  getOnePost: (postId) => instance.get(`/api/board/${postId}`),
  writePost: () => instance.post('/api/board'),
  editPost: (postId) => instance.put(`/api/board/${postId}`),
  deletePost: (postId) => instance.delete(`/api/board/${postId}`),
}

export const dictApi = {
  getDicts: () => instance.get('/api/dict?page=0&size=10'),
  writeDict: () => instance.post('/api/dict'),
  editDict: (dickId) => instance.put(`/api/dict/${dickId}`),
  dictEditHistory: (dictId) => instance.get(`/api/dict/${dictId}/history`),
  dictEditHistoryDetail: (historyId) => instance.get(`/api/dict/history/${historyId}`),
  rollbackDict: (historyId) => instance.get(`/api/dict/revert/${historyId}`),
  /* 추가 */
  liked: (dictId) => instance.get(`/api/dict/${dictId}/like`),
}

export const quizApi = {
  /* 추가 */
  getQuizList: () => instance.get('/api/quiz?count=10'),
}

export const mainApi = {
  mainPage: () => instance.get('/api/main'),
}

/* 추가 */
export const commentApi = {
  getComments: (postId) => instance.get(`/api/board/${postId}/comment?page=0&size=10`),
  /* writeComment -> addComment 로 수정 */
  addComment: (postId) => instance.post(`/api/board/${postId}/comment`),
  editComment: (commentId) => instance.put(`/api/board/${commentId}`),
  deleteComment: (commentId) => instance.delete(`/api/board/comment/${commentId}`),
}
