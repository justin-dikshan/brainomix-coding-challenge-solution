import { createRoot } from 'react-dom/client'
import { Main } from './main'
import { Provider } from 'react-redux'
import store from './store/store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Main />
  </Provider>
)