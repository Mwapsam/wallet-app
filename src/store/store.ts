import { configureStore } from '@reduxjs/toolkit';
import users from '../reducers/user';
import authSlice from '../reducers/authSlice';


const store = configureStore({
  reducer: {
    users,
    authSlice
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['payload'],
      ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      ignoredPaths: ['items.dates'],
    },
  }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;