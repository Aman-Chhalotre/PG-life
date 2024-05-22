import { Link, NavLink, Outlet } from 'react-router-dom'
import './App.css'
import { useState, useEffect } from 'react'
import Header from './components/header-footer/Header'
import Footer from './components/header-footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth.js'
import authSlice, { logout, getUserData } from '../store/authSlice.js'
import { DetailContextProvider } from './context/details'
import { LoginContextProvider } from './context/login.js'
import { SignupContextProvider } from './context/signup.js'
import { InterestedPropertyProvider } from './context/interestedProperties.js'
import { SearchContextProvider } from './context/search.js'
import Modals from './components/modals/Modals.jsx'
import propertyService from './appwrite/property.js'



function App() {


  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        console.log(userData)
        if (userData) {
          dispatch(getUserData({ userData }))
          if (userData.prefs.label == 'admin') {
            setIsAdmin(true)
          }
        } else {
          dispatch(logout())
        }

      })
      .catch((error) => {
        console.log(error)
      })



  }, [])

  const authStatus = useSelector((state) => state.authReducer.status)

  const [isAdmin, setIsAdmin] = useState(false)
  const [showLogin, setshowLogin] = useState(true)
  const [showSignup, setshowSignup] = useState(false)
  const [temp, setTemp] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [phone, setPhone] = useState('')
  const [label, setLabel] = useState(null)



  return (
    <>

      <LoginContextProvider value={{ showLogin, setshowLogin, isLoggedIn, setIsLoggedIn, phone, setPhone }}>

        <SignupContextProvider value={{ showSignup, setshowSignup, isSignup, setIsSignup, label, setLabel }}>
          {(!authStatus) ?

            <Modals />
            :
            <SearchContextProvider value={{}}>


              <Header isAdmin={isAdmin}></Header>

              <DetailContextProvider value={{}}>

                <InterestedPropertyProvider value={{ temp, setTemp }}>
                  <Outlet></Outlet>
                </InterestedPropertyProvider>

              </DetailContextProvider>

              <Footer></Footer>

            </SearchContextProvider>
          }





        </SignupContextProvider>

      </LoginContextProvider>

    </>
  )
}

export default App
