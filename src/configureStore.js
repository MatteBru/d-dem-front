import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer'

const configureStore = () => {
  // right now there's not too much additional set up we are doing
  // but there could be in the future
  return createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)));
};
export default configureStore;
