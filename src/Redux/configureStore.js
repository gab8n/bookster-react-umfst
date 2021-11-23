import { createStore, combineReducers } from 'redux';

import authStore from 'Redux/Ducks/authStore';
import bookCollectionFilters from 'Redux/Ducks/bookCollectionFilters';

const reducer = combineReducers({
  authStore,
  bookCollectionFilters,
});

const configureStore = (initialState) =>
  createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default configureStore;
