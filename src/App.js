import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './redux/ConfigureStore'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './styles/GlobalStyle'
import theme from './styles/theme'
import { Main, NotFound, Quiz, QuizResult, Join, Login, Mypage, PostDetail, PostEdit, PostList, PostWrite, DictEdit, DictList, DictWrite } from './pages'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Main} />
          <Route path="/join" exact component={Join} />
          <Route path="/login" exact component={Login} />
          <Route path="/mypage/:nickname" exact component={Mypage} />
          <Route path="/quiz" exact component={Quiz} />
          <Route path="/quiz/result" exact component={QuizResult} />
          <Route path="/post" exact component={PostList} />
          <Route path="/post/detail/:postId" exact component={PostDetail} />
          <Route path="/post/write" exact component={PostWrite} />
          <Route path="/post/edit/:postId" exact component={PostEdit} />
          <Route path="/dict" exact component={DictList} />
          <Route path="/dict/write" exact component={DictWrite} />
          <Route path="/dict/edit/:wordId" exact component={DictEdit} />
          {/* <Route path="" exact component={NotFound} /> */}
        </ConnectedRouter>
      </ThemeProvider>
    </>
  )
}

export default App
