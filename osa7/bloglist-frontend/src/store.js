import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
const creducer = combineReducers({
    notification: notificationReducer,
    blogs : blogReducer,
    user : userReducer

})
const store = createStore(creducer, composeWithDevTools(applyMiddleware(thunk)))

export default store