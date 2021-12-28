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

  /* 추가 */
  checkUsername: (username) => instance.get(`/api/signup/username?username=${username}`),
  checkNickname: (nickname) => instance.get(`/api/signup/nickname?nickname=${nickname}`),
}

/* 추가 */
export const mypageApi = {
  getMyInfo: () => instance.get('/api/mypage'),
  editProfileImage: (newProfileImage) => instance.post('/api/user/profileImage', newProfileImage),
  editNickname: (nickname) => instance.post('/api/user/nickname', { nickname: nickname }),
}

export const boardApi = {
  getPosts: (categoryName) => instance.get(`/api/board/list/${categoryName}`),
  getOnePost: (boardId) => instance.get(`/api/board/${boardId}`),
  writePost: (title, content, subject, category, categoryName) => instance.post(`/api/board/${categoryName}`, { title: title, content: content, subject: subject, category: category }),
  editPost: (boardId, title, content, subject) => instance.put(`/api/board/${boardId}`, { title: title, content: content, subject: subject }),
  deletePost: (boardId) => instance.delete(`/api/board/${boardId}`),
  /* [수정] selectPost -> searchPost */
  searchPost: (search) => instance.get(`/api/board/search?q=${search}`),
  // 추가
  likePost: (postId) => instance.post(`/api/board/${postId}/like`),
  getSubject: () => instance.get('/api/board/subject'),
}

export const dictApi = {
  getDictMain: () => instance.get('/api/dict?page=0&size=10'),
  getDictDetail: (dictId) => instance.get(`/api/dict/${dictId}`),
  addDict: (title, summary, content) => instance.post('/api/dict', { title: title, summary: summary, content: content }),
  editDict: (dictId) => instance.put(`/api/dict/${dictId}`),
  deleteDict: (dictId) => instance.delete(`/api/dict/${dictId}`),
  dictEditHistory: (dictId) => instance.get(`/api/dict/${dictId}/history`),
  dictEditHistoryDetail: (historyId) => instance.get(`/api/dict/history/${historyId}`),
  rollbackDict: (historyId) => instance.get(`/api/dict/revert/${historyId}`),
  /* 추가 */
  liked: (dictId) => instance.get(`/api/dict/${dictId}/like`),
}

export const quizApi = {
  /* 추가 */
  getQuizList: (category) => instance.get(`/api/quiz/${category}?count=10`),
}

export const mainApi = {
  mainPage: () => instance.get('/api/main'),
}

/* 추가 */
export const commentApi = {
  getComments: (postId) => instance.get(`/api/board/${postId}/comment?page=0&size=10`),
  /* writeComment -> addComment 로 수정 */
  addComment: (postId, comment) => instance.post(`/api/board/${postId}/comment`, { content: comment }),
  editComment: (commentId) => instance.put(`/api/board/${commentId}`),
  deleteComment: (commentId) => instance.delete(`/api/board/comment/${commentId}`),
}
