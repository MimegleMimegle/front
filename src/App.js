import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
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
import bg from '../src/styles/image/background.jpeg'
// import yellowmollu from '../src/styles/image/배경 분리/노랑 몰?루.svg'

function App() {
  useEffect(() => {
    ReactGA.initialize('user id')
    history.listen((location) => {
      ReactGA.set({ page: location.pathname }) // Update the user's current page
      ReactGA.pageview(location.pathname) // Record a pageview for the given page
    })
    // ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])
  return (
    <>
    <Wrapper>
    {/* <Background> */}
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ConnectedRouter history={history}>
          <MobileFrame>
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
            <Route path="/dict/mymeme" exact component={Auth(DictMyMeMe, true)} />
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
    {/* </Background> */}
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

  @media screen and (min-width: 500px) {
    background: url(${bg}) no-repeat;
    background-size: 100% 100vh;
  }
`

export default App

ReactGA.event({
  category: 'User',
  action: 'Created an Account',
})
ReactGA.exception({
  description: 'An error ocurred',
  fatal: true,
})
