import axios from 'axios'

/* Axios 인스턴스 생성 */
const instance = axios.create({
  baseURL: 'http://54.180.150.230',
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
  getProfileInfo: () => instance.get('/api/userInfo'),

  /* 추가 */
  checkUsername: (username) => instance.get(`/api/signup/username?username=${username}`),
  checkNickname: (nickname) => instance.get(`/api/signup/nickname?nickname=${nickname}`),
}

/* 추가 */
export const mypageApi = {
  getUserInfo: () => instance.get('/api/mypage'),
  editProfileImage: (newProfileImage) => instance.post('/api/user/profileImage', newProfileImage),
  editNickname: (nickname) => instance.post('/api/user/nickname', { nickname: nickname }),
}

export const boardApi = {
  getPosts: (pageSize, currentPage) => instance.get(`http://54.180.150.230/api/board/list/FREEBOARD?page=${pageSize * (currentPage - 1)}&size=${pageSize}`),
  getOnePost: (boardId) => instance.get(`/api/board/${boardId}`),
  writePost: (post) => instance.post('/api/board/FREEBOARD', post),
  editPost: (boardId, content) => instance.put(`/api/board/${boardId}`, content),
  deletePost: (boardId) => instance.delete(`/api/board/${boardId}`),
  selectPost: () => instance.get('/api/board?q=query'),
  // 추가
  getSubject: () => instance.get('/api/board/subject'),
  recommendHashTag: () => instance.get('/api/board/hashTag'),
  searchPost: (query) => instance.get(`/api/board/search?q=${query}`),
  totalLength: () => instance.get('api/board/count/FREEBOARD'),
}

export const dictApi = {
  getDictMain: (pageSize, currentPage) => instance.get(`http://54.180.150.230/api/dict?page=${currentPage - 1}&size=${pageSize}`),
  getDictDetail: (dictId) => instance.get(`/api/dict/${dictId}`),
  getTodayDict: () => instance.get(`/api/bestDict/dict`),
  addDict: (title, summary, content) => instance.post('/api/dict', { title: title, summary: summary, content: content }),
  editDict: (dictId, summary, content) => instance.put(`/api/dict/${dictId}`, { dictId: dictId, summary: summary, content: content }),
  deleteDict: (dictId) => instance.delete(`/api/dict/${dictId}`),
  dictEditHistory: (dictId) => instance.get(`/api/dict/${dictId}/history`),
  dictEditHistoryDetail: (historyId) => instance.get(`/api/dict/history/${historyId}`),
  rollbackDict: (historyId) => instance.get(`/api/dict/revert/${historyId}`),
  searchDict: (keyword, pageSize, currentPage) => instance.get(`/api/dict/search?q=${keyword}&page=${pageSize * (currentPage - 1)}&size=${pageSize}`),
  /* 추가 */
  tellMeTotalLength: () => instance.get('/api/count/dict'),
  tellMeTotalLengthSearch: (keyword) => instance.get(`/api/count/dict?q=${keyword}`),
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
  addComment: (boardId, comment) => instance.post(`/api/board/${boardId}/comment`, { content: comment }),
  editComment: (commentId) => instance.put(`/api/board/${commentId}`),
  deleteComment: (commentId) => instance.delete(`/api/board/comment/${commentId}`),
}

export const likeApi = {
  likeBoard: (boardId) => instance.post(`/api/board/${boardId}/like`),
  likeDict: (dictId) => instance.post(`/api/dict/${dictId}/like`),
}

export const imageApi = {
  getImageList: (page, size) => instance.get(`/api/board/list/IMAGEBOARD?page=${page}&size=${size}`),
  getImageDetail: (boardId) => instance.get(`/api/board/${boardId}`),
  uploadImage: (category, imageData) => instance.post(`/api/board/${category}`, imageData),
  deleteImage: (boardId) => instance.delete(`/api/board/${boardId}`),
  giveMeTotalLength: () => instance.get(`/api/board/count/IMAGEBOARD`),
  getBestImageList: () => instance.get(`api/board/IMAGEBOARD/best`),
}
