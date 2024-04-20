import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './components/Home.jsx'
import Dashboard from './components/Dashboard.jsx'
import Properties_List from './components/Properties_List.jsx'
import Property_Detail from './components/Property_Detail.jsx'
import Editpage from './components/editpage/Editpage.jsx'
import { Provider } from 'react-redux'
import store from '../store/store.js'
import Modals from './components/modals/Modals.jsx'
import RegisterProperty from './components/modals/registerProperty/RegisterProperty.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='properties_list' element={<Properties_List />} />
      <Route path='property_detail' element={<Property_Detail />} />
      <Route path='editpage' element={<Editpage />} />
      <Route path='modals' element={<Modals />} />
      <Route path='registerProperty' element={<RegisterProperty />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

