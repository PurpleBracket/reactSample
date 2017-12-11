import { compose, applyMiddleware, createStore } from 'redux'
import reducers from '../reducers/index'
import { createOpbeatMiddleware } from 'opbeat-react/redux'
import ReduxPromise from 'redux-promise'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const enhancer = composeEnhancers(
  applyMiddleware(createOpbeatMiddleware(), ReduxPromise)
  // other store enhancers if any
)

export default () => {
  const store = createStore(reducers, enhancer)
  return store
}

// export default () => {
//   const store = createStore(reducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//
//   return store
// }
