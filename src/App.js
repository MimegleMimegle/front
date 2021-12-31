import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './redux/ConfigureStore'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './styles/GlobalStyle'
import theme from './styles/theme'
import {
  Main,
  NotFound,
  QuizIntro,
  Quiz,
  QuizResult,
  Join,
  Login,
  Mypage,
  PostDetail,
  PostEdit,
  PostList,
  PostWrite,
  PostSearch,
  DictEdit,
  DictList,
  DictWrite,
  DictDetail,
  ImageList,
  ImageDetail,
  ImageUpload,
  DictSearch,
} from './pages'
import MobileFrame from './components/MobileFrame'
import CommentTest from './pages/CommentTest'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ConnectedRouter history={history}>
          <MobileFrame>
            <Route path="/" exact component={Main} />
            <Route path="/join" exact component={Join} />
            <Route path="/login" exact component={Login} />
            <Route path="/mypage" exact component={Mypage} />
            <Route path="/quiz" exact component={QuizIntro} />
            <Route path="/quiz/:category" exact component={Quiz} />
            <Route path="/quiz/:category/result" exact component={QuizResult} />
            <Route path="/post" exact component={PostList} />
            <Route path="/post/detail/:boardId" exact component={PostDetail} />
            <Route path="/post/write" exact component={PostWrite} />
            <Route path="/post/edit/:boardId" exact component={PostEdit} />
            <Route path="/post/search" exact component={PostSearch} />
            <Route path="/dict" exact component={DictList} />
            <Route path="/dict/write" exact component={DictWrite} />
            <Route path="/dict/edit/:dictId" exact component={DictEdit} />
            <Route path="/dict/detail/:dictId" exact component={DictDetail} />
            <Route path="/dict/search/:keyword" exact component={DictSearch} />
            <Route path="/image" exact component={ImageList} />
            <Route path="/image/:imageId" exact component={ImageDetail} />
            <Route path="/image/upload" exact component={ImageUpload} />
            {/* 댓글 서버 연결 확인 후 삭제 예정 */}
            <Route path="/comment" exact component={CommentTest} />
            {/* <Route path="" exact component={NotFound} /> */}
          </MobileFrame>
        </ConnectedRouter>
      </ThemeProvider>
    </>
  )
}

export default App
