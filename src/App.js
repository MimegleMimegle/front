import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './redux/ConfigureStore'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyle from './styles/GlobalStyle'
import theme from './styles/theme'
import Auth from './shared/auth'
import {
  Main,
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
  DictEdit,
  DictList,
  DictWrite,
  DictDetail,
  DictHistory,
  DictMyMeMe,
  ImageList,
  ImageDetail,
  ImageUpload,
  DictSearch,
  DictStat,
} from './pages'
import MobileFrame from './components/MobileFrame'
import Background from './components/Background'
import NaverLoginHandler from './shared/NaverLoginHandler'
import KakaoLoginHandler from './shared/KakaoLoginHandler'
import GoogleLoginHandler from './shared/GoogleLoginHandler'
import './App.css'

function App() {
  return (
    <>
      <Wrapper>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ConnectedRouter history={history}>
            <BackgroundOpacity />
            <Background className="BackgroundPage" />
            <MobileFrame className="MobileFramePage">
              <Route path="/" exact component={Main} />
              <Route path="/join" exact component={Auth(Join, false)} />
              <Route path="/login" exact component={Auth(Login, false)} />
              <Route path="/mypage" exact component={Auth(Mypage, true)} />
              <Route path="/quiz" exact component={QuizIntro} />
              <Route path="/quiz/:category" exact component={Quiz} />
              <Route path="/quiz/:category/result" exact component={QuizResult} />
              <Route path="/dict/question" exact component={PostList} />
              <Route path="/dict/question/detail/:questionId" exact component={PostDetail} />
              <Route path="/dict/question/write" exact component={Auth(PostWrite, true)} />
              <Route path="/dict/question/edit/:questionId" exact component={Auth(PostEdit, true)} />
              <Route path="/dict" exact component={DictList} />
              <Route path="/dict/write" exact component={Auth(DictWrite, true)} />
              <Route path="/dict/edit/:dictId" exact component={Auth(DictEdit, true)} />
              <Route path="/dict/detail/:dictId" exact component={DictDetail} />
              <Route path="/dict/search/:keyword" exact component={DictSearch} />
              <Route path="/dict/history/:dictId" exact component={DictHistory} />
              <Route path="/dict/mymeme" exact component={DictMyMeMe} />
              <Route path="/dict/stat" exact component={DictStat} />
              <Route path="/image" exact component={ImageList} />
              <Route path="/image/detail/:imageId" exact component={ImageDetail} />
              <Route path="/image/upload" exact component={ImageUpload} />
              {/* Social Login Redirect Handler */}
              <Route path="/redirect/naver" component={NaverLoginHandler} />
              <Route path="/redirect/kakao" component={KakaoLoginHandler} />
              <Route path="/redirect/google" component={GoogleLoginHandler} />
            </MobileFrame>
          </ConnectedRouter>
        </ThemeProvider>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #2b2b2b;
  /* background-size: contain; */
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .BackgroundPage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -999;
  }

  .MobileFramePage {
    z-index: 999;
  }

  @media screen and (min-width: 500px) {
    background-size: 100% 100vh;
  }
`

const BackgroundOpacity = styled.div`
  width: 100vw;
  height: 100vh;
  /* background: rgb(250, 250, 250, 0.3); */
  /* background-size: contain; */
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export default App
