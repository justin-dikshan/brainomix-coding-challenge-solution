import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from './settingsSlice'

const store = configureStore({
  reducer: {
    appSettings: settingsReducer
  }
})

export default store