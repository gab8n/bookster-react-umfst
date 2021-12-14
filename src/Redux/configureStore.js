import { createStore, combineReducers } from 'redux';

import authStore from 'Redux/Ducks/authStore';
import bookCollectionFilters from 'Redux/Ducks/bookCollectionFilters';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducer = combineReducers({
  authStore,
  bookCollectionFilters,
});
const persistConfig = {
  key: 'root',
  blacklist: ['bookCollectionFilters'],
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const configureStore = () =>
  createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default configureStore;
