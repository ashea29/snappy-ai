import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import interactionsReducer from '../state/entities/interactions';

export const store = configureStore({
  reducer: {
    interactions: interactionsReducer,
  },
  devTools: process.env.NODE_ENV === 'development' ? true : false
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;