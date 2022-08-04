import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { ColorModeScript } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store, persistor } from 'utils/store'
import { PersistGate } from 'redux-persist/integration/react'
import { App } from 'App'
import reportWebVitals from 'reportWebVitals'
import * as serviceWorker from 'serviceWorker'
import 'assets/global.css'

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

serviceWorker.register()

reportWebVitals()
