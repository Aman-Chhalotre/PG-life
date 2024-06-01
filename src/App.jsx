import { Outlet } from 'react-router-dom'
import './App.css'
import { useState, useEffect } from 'react'
import Header from './components/header-footer/Header'
import Footer from './components/header-footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth.js'
import { logout, getUserData } from '../store/authSlice.js'
import { DetailContextProvider } from './context/details'
import { LoginContextProvider } from './context/login.js'
import { SignupContextProvider } from './context/signup.js'
import { InterestedPropertyProvider } from './context/interestedProperties.js'
import { SearchContextProvider } from './context/search.js'
import Modals from './components/modals/Modals.jsx'
import progressSpinner from './assets/img/progress_spinner.gif'


function App() {
  const [loading, setLoading] = useState()

  const [showLogin, setshowLogin] = useState(true)
  const [showSignup, setshowSignup] = useState(false)
  const [temp, setTemp] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [phone, setPhone] = useState('')
  const [label, setLabel] = useState(null)


  const dispatch = useDispatch()

  const authStatus = useSelector((state) => state.authReducer.status)


  useEffect(() => {
    setLoading(true)
    authService.getCurrentUser()
      .then((userData) => {
        console.log(userData)
        if (userData) {
          dispatch(getUserData({ userData }))
          setLoading(false)
        } else {
          dispatch(logout())
        }

      })
      .catch((error) => {
        console.log(error)
      })


  }, [])


  return (
    <>
      {(loading) ?

        <div className='absolute z-50 h-full w-full flex items-center justify-center bg-[#1D1E22]'>
          <img src={progressSpinner} alt="" className='text-black size-10' />
        </div>

        :

        <LoginContextProvider value={{ showLogin, setshowLogin, isLoggedIn, setIsLoggedIn, phone, setPhone }}>

          <SignupContextProvider value={{ showSignup, setshowSignup, isSignup, setIsSignup, label, setLabel }}>
            {(!authStatus) ?

              <Modals />
              :
              <SearchContextProvider >


                <Header ></Header>

                <DetailContextProvider >

                  <InterestedPropertyProvider value={{ temp, setTemp }}>
                    <Outlet></Outlet>
                  </InterestedPropertyProvider>

                </DetailContextProvider>

                <Footer></Footer>

              </SearchContextProvider>
            }

          </SignupContextProvider>

        </LoginContextProvider>
      }



    </>
  )
}

export default App
