import { createStore, combineReducers } from 'redux';

import authStore from 'Redux/Ducks/authStore';

const reducer = combineReducers({
  authStore,
});

const configureStore = (initialState) =>
  createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default configureStore;
