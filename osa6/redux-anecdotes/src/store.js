import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducer from './reducers/anecdoteReducer'
import { composeWithDevTools } from 'redux-devtools-extension' 
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'

const creducer = combineReducers({
    notification : notificationReducer,
    anecdotes : reducer,
    filter: filterReducer

})
const store = createStore(creducer, composeWithDevTools( applyMiddleware(thunk)))

export default store