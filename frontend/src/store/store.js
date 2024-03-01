// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './reducers/userSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};



const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);


// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './reducers/userSlice';

// export default configureStore({
//     reducer: {
//         user: userReducer
//     }
// });

