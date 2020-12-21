import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './favoritesSlice'
import sessionReducer from './sessionSlice'
import modalReducer from './modalSlice'

export default configureStore({
  reducer: {
    plug: favoritesReducer,
    session: sessionReducer,
    modal: modalReducer
  }
})