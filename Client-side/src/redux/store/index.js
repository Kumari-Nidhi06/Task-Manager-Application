import { legacy_createStore as createStore,combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/index'

const middleware = [thunk];
// const  store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(...middleware)))
export default store;