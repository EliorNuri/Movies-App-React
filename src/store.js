import { createStore, applyMiddleware , combineReducers } from 'redux';
import thunk from 'redux-thunk';
import storageSession from 'redux-persist/lib/storage/session';
import { persistStore, persistReducer } from 'redux-persist';

import movieReducer from './reducers/movieReducer';

const persistConfig = {
  key: 'root',
  storage:storageSession,
}

const rootReducer = combineReducers({
    movie: movieReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
);

export const persistor = persistStore(store);
