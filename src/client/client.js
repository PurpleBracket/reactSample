import initOpbeat from 'opbeat-react'
import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, BrowserRouter } from 'react-router-dom'
import './styles/styles.scss'
import App from './app'
import configurestore from './store/configurestore'
import { Provider } from 'react-redux'
import './global.state'
import { IntlProvider } from 'react-intl'
import GoogleAnalyticsListener from './google.analytics.listener'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-110990995-1')

// TODO: Pick credentials from config?
initOpbeat({
  orgId: 'e2942501085d438b86653de8f239a126',
  appId: 'da58913f0b'
})

const store = configurestore()

// console.log(store.getState())

// const unsubscribe =
store.subscribe(() => {
  console.log(store.getState())
})

// store.dispatch(addCompany({name: "TEST"}))

// unsubscribe()

// store.dispatch({
//   type: 'COMPANY_GET'
// })

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale='en'>
      <BrowserRouter history={browserHistory}>
        <GoogleAnalyticsListener>
          <App />
        </GoogleAnalyticsListener>
      </BrowserRouter>
    </IntlProvider>
  </Provider>, document.getElementById('root'))
