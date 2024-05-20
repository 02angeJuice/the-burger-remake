import { configureStore } from "@reduxjs/toolkit"

import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import burgerSlice from "./slices/burgerSlice.js"

// Persist configuration for burger slice
const burgerPersistConfig = {
  key: "burger",
  storage,
}

// Creating persisted reducers
const persistedBurgerReducer = persistReducer(burgerPersistConfig, burgerSlice)

// Configure the store with persisted reducers
export const store = configureStore({
  reducer: {
    burger: persistedBurgerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Create a persistor
export const persistor = persistStore(store)
