import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { connectRouter } from 'connected-react-router'
import Post from './modules/post'
import Quiz from './modules/quiz'
import User from './modules/user'
import Dict from './modules/dict'
import Main from './modules/main'
import Comment from './modules/comment'
import Mypage from './modules/mypage'
import Image from './modules/image'

export const history = createBrowserHistory()

const rootReducer = combineReducers({
  post: Post,
  quiz: Quiz,
  user: User,
  dict: Dict,
  main: Main,
  comment: Comment,
  mypage: Mypage,
  image: Image,
  router: connectRouter(history),
})

const middlewares = [thunk.withExtraArgument({ history: history })]

const env = process.env.NODE_ENV

if (env === 'development') {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

const enhancer = composeEnhancers(applyMiddleware(...middlewares))

let store = (initialStore) => createStore(rootReducer, enhancer)

export default store()
