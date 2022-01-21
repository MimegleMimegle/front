import axios from 'axios'

/* Axios 인스턴스 생성 */
const instance = axios.create({
  /* production */
  baseURL: 'https://youtuberandomplayer.shop',
  /* dev - local */
  // baseURL: 'http://13.209.99.193',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-type': 'application/json; charset=UTF-8',
    accept: 'application/json',
  },
})

/* Interceptor를 통한 Header 설정 */
instance.interceptors.request.use((config) => {
  // const cookieList = document.cookie.split('=')
  // const accessToken = cookieList.length === 2 ? cookieList[1] : cookieList[2]
  const accessToken = localStorage.getItem('token')
  config.headers.common['authorization'] = `${accessToken}`
  return config
})

/* export api */
export const userApi = {
  login: (username, password) => instance.post('/api/user', { username: username, password: password }),
  socialLogin: () => instance.get('/api/user/kakao/callback'),
  join: (username, nickname, password, passwordCheck) => instance.post('/api/signup', { username: username, nickname: nickname, password: password, passwordCheck: passwordCheck }),

  /* 추가 */
  checkUsername: (username) => instance.get(`/api/signup/username?username=${username}`),
  checkNickname: (nickname) => instance.get(`/api/signup/nickname?nickname=${nickname}`),
  KakaoLogin: (code) => instance.get(`/api/user/kakao/callback?code=${code}`),
  NaverLogin: (code, state) => instance.get(`/api/user/naver/callback?code=${code}&state=${state}`),
  GoogleLogin: () => instance.get(`/api/user/google/callback`),
}

export const mypageApi = {
  getMypageData: () => instance.get('/api/mypage'),
  getProfileInfo: () => instance.get('/api/userInfo'),
  editProfileImage: (newProfileImage) => instance.post('/api/user/profileImage', newProfileImage),
  editNickname: (nickname) => instance.post('/api/user/nickname', { nickname: nickname }),
  checkAlarm: () => instance.get('/api/alarm/read'),
}

export const boardApi = {
  getPosts: (pageSize, currentPage) => instance.get(`/api/board/list/FREEBOARD?page=${currentPage - 1}&size=${pageSize}`),
  getOnePost: (boardId) => instance.get(`/api/board/${boardId}`),
  writePost: (post) => instance.post('/api/board/FREEBOARD', post),
  editPost: (boardId, content) => instance.put(`/api/board/${boardId}`, content),
  deletePost: (boardId) => instance.delete(`/api/board/${boardId}`),
  selectPost: () => instance.get('/api/board?q=query'),
  getSubject: () => instance.get('/api/board/subject'),
  recommendHashTag: () => instance.get('/api/board/hashTag'),
  searchPost: (query) => instance.get(`/api/board/search?q=${query}`),
  totalLength: () => instance.get('api/board/count/FREEBOARD'),
}

export const dictQuestionApi = {
  getQuestions: (pageSize, currentPage) => instance.get(`/api/dict/question?page=${currentPage - 1}&size=${pageSize}`),
  getOneQuestion: (questionId) => instance.get(`/api/dict/question/${questionId}`),
  writeQuestion: (question) => instance.post('/api/dict/question', question),
  editQuestion: (questionId, content) => instance.put(`/api/dict/question/${questionId}`, content),
  deleteQuestion: (questionId) => instance.delete(`/api/dict/question/${questionId}`),
  curiousToo: (questionId) => instance.get(`/api/dict/question/curiousToo/${questionId}`),
  selectQuestion: (commentId) => instance.get(`/api/dict/question/select/${commentId}`),
  totalLength: () => instance.get('/api/dict/question/count'),
  //백엔드진행중
  searchAlldict: (currentPage, pageSize) => instance.get(`/api/dict/search?q=’테스트’&page=${currentPage - 1}&size=${pageSize}`),
}

export const dictApi = {
  getDictMain: (pageSize, currentPage) => instance.get(`http://54.180.150.230/api/dict?page=${pageSize * (currentPage - 1)}&size=${pageSize}`),
  getDictDetail: (dictId) => instance.get(`/api/dict/${dictId}`),
  getTodayDict: () => instance.get(`/api/bestDict/dict`),
  addDict: (title, summary, content) => instance.post('/api/dict', { title: title, summary: summary, content: content }),
  editDict: (dictId, summary, content) => instance.put(`/api/dict/${dictId}`, { dictId: dictId, summary: summary, content: content }),
  deleteDict: (dictId) => instance.delete(`/api/dict/${dictId}`),
  dictEditHistory: (dictId) => instance.get(`/api/dict/${dictId}/history`),
  dictEditHistoryDetail: (historyId) => instance.get(`/api/dict/history/${historyId}`),
  rollbackDict: (historyId) => instance.get(`/api/dict/revert/${historyId}`),
  searchDict: (keyword, pageSize, currentPage) => instance.get(`/api/dict/search?q=${keyword}&page=${pageSize * (currentPage - 1)}&size=${pageSize}`),
  tellMeTotalLength: () => instance.get('/api/count/dict'),
  tellMeTotalLengthSearch: (keyword) => instance.get(`/api/count/dict?q=${keyword}`),
  dobleCheckDict: (dictName) => instance.post('/api/check/dict', { dictName: dictName }),
  dictMyScrapList: (userId) => instance.get('/api/myMeme/dict', { userId: userId }),
  /* 추가 */
  getDictStat: () => instance.get('/api/stat/dict'),
}

export const quizApi = {
  getQuizList: (category) => instance.get(`/api/quiz/${category}?count=10`),
  submitScore: (category, score) => instance.get(`api/stat/quiz/${category}?score=${score}`),
}

export const mainApi = {
  mainPage: () => instance.get('/api/main'),
  countVisitors: () => instance.get('api/stat/visitor'),
}

export const commentApi = {
  addComment: (questionId, comment) => instance.post(`/api/dict/${questionId}/comment`, { content: comment }),
  deleteComment: (commentId) => instance.delete(`/api/dict/comment/${commentId}`),
  likeComment: (commentId) => instance.get(`/api/dict/comment/like/${commentId}`),
}

export const likeApi = {
  likeBoard: (boardId) => instance.get(`/api/board/${boardId}/like`),
  likeDict: (dictId) => instance.get(`/api/dict/${dictId}/like`),
}

export const imageApi = {
  getImageList: (page, size) => instance.get(`/api/board/list/IMAGEBOARD?page=${page}&size=${size}`),
  getImageDetail: (boardId) => instance.get(`/api/board/${boardId}`),
  uploadImage: (category, imageData) => instance.post(`/api/board/${category}`, imageData),
  deleteImage: (boardId) => instance.delete(`/api/board/${boardId}`),
  giveMeTotalLength: () => instance.get(`/api/board/count/IMAGEBOARD`),
  getBestImageList: () => instance.get(`api/board/IMAGEBOARD/best`),
}
