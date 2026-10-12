import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../services/authApi'
import { documentApi } from '../services/documentApi'
import { aiApi } from '../services/aiApi'

export const makeStore = () => {
  return configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [documentApi.reducerPath]: documentApi.reducer,
        [aiApi.reducerPath]: aiApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, documentApi.middleware, aiApi.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']