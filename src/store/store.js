import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from './settingsSlice'

/** Settings reducer is mounted as `appSettings`. */
const store = configureStore({
  reducer: {
    appSettings: settingsReducer
  }
})

export default store
