import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import { Provider } from 'react-redux';
import App  from '../src/App'
import store from '../src/store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
