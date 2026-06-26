import { createRoot } from 'react-dom/client'
import './app/index.css'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/app.route.jsx'
import { store } from "./store/store"


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
