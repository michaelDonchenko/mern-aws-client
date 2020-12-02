import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userReducer } from './reducers/userReducer'
import cookie from 'js-cookie'

const reducer = combineReducers({
  userInfo: userReducer,
})

const userFromLocalStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

const tokenFromCookie = cookie.get('token') ? cookie.get('token') : null

const initialState = {
  userInfo: { user: userFromLocalStorage, token: tokenFromCookie },
}

const middleWare = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
)

export default store
