import { compose, createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { rootReducer } from "./root-reducer"
import { loggerMiddleware } from "./middleware/logger"
import { thunk } from "redux-thunk"
import createSagaMiddleware from "redux-saga"

import { rootSaga } from "./root-saga"

// middlewares
const sagaMiddleware = createSagaMiddleware()

const middlewares = [
  process.env.NODE_ENV !== "production" && loggerMiddleware,
  process.env.NODE_ENV !== "production" && logger,
  // thunk,
  sagaMiddleware
].filter(Boolean)

const composeEnhancer = (
  process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose

// const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))
const composedEnhancers = compose(applyMiddleware(...middlewares))

// redux persist
const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["user"]
}

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// store
export const store = createStore(rootReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga)

// export const persistor = persistStore(store)