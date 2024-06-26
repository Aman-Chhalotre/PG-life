import React from 'react'
import '../../css/header.css'
import logo from '../../assets/img/logo.png'
import { Link, NavLink, useNavigate, } from 'react-router-dom'
import { gsap } from 'gsap/dist/gsap'
import { useEffect, useState } from 'react'
import { logout } from '../../../store/authSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../../appwrite/auth.js'
import propertyService from '../../appwrite/property.js'
import { getProperties } from '../../../store/propertySlice.js'


function Header() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const userData = useSelector((state) => state.authReducer.userData)
  const navigate = useNavigate()

  useEffect(() => {
    if (userData?.prefs?.label == 'admin') {
      setIsAdmin(true)
    }
  }, [])

  const dispatch = useDispatch()

  const onHandleclick = () => {
    authService.logout()
    dispatch(logout())
  }

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.modals, #buttons', {
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 1
      }), gsap.from('.pglifelogo', {
        opacity: 0,
        x: -50,
        duration: 1.5,
      }), gsap.from('#form', {
        opacity: 0,
        y: -30,
        duration: 1.5,
      })
    }
    )
    return () => ctx.revert();
  }, [])


  function handlePropertyListClick() {
    propertyService.getProperties()
      .then((response) => {
        dispatch(getProperties(response.documents))
      })
  }


  return (
    <>
      <nav className='h-20 bg-[#1d1e22] flex flex-col gap-1 justify-center shadow-lg md:px-[30px] px-3 relative'>

        <div id='menu' className={`${(showMenu) ? 'h-full' : 'h-[0]'} w-[100%] transition-all duration-500 px-3 bg-[#F54B4B] absolute top-0 right-0 z-10`}>
          <div className={`${(showMenu) ? 'flex' : 'hidden'} sm:gap-2 gap-1 items-center justify-between`}>
            <div id='buttons' className='flex flex-col items-start justify-start gap-2 mt-1'>

              <NavLink to='/Dashboard' className={({ isActive }) => `${(isActive) ? 'text-orange-300' : 'text-white'}  md:text-sm text-xs`} onClick={() => { setShowMenu(!showMenu) }}>
                <i className="fa-solid fa-user text-white"></i>&nbsp;
                Dashboard
              </NavLink>

              {

                (isAdmin) ? <NavLink to='/RegisterProperty' className={({ isActive }) => ` block ${(isActive) ? 'text-orange-300' : 'text-white'} font-medium text-xs `} onClick={() => { setShowMenu(!showMenu) }}>Register Property</NavLink> : null
              }


              {/* <span className='text-white'>|</span> */}

              <button className='text-white md:text-sm text-xs' onClick={() => { onHandleclick(); setShowMenu(!showMenu) }}>
                <i className="fa-solid fa-right-from-bracket text-white"></i>&nbsp;
                Logout
              </button>
            </div>

            <div>
              <div><i className="fa-solid fa-xmark text-xl text-white font-bold" onClick={() => { setShowMenu(!showMenu) }}></i></div>
            </div>

          </div>
        </div>

        <div className='flex items-center justify-between sm:px-10'>
          <Link to='/'>
            <img src={logo} alt="pglifelogo" className='pglifelogo md:h-[35px] md:w-[90px] h-[30px] min-w-[80px]' />
          </Link>

          <div className='flex items-center sm:text-base text-sm'>
            <div className='flex items-center gap-3'>
              <NavLink className={({ isActive }) => `${(isActive) ? 'text-orange-300' : 'text-white'} font-medium sm:text-base text-sm `} to='/' onClick={() => { setShowMenu(false) }}>Home</NavLink>

              <NavLink className={({ isActive }) => `${(isActive) ? 'text-orange-300' : 'text-white'} font-medium sm:text-base text-sm `} to='/Properties_List' onClick={() => { handlePropertyListClick(); setShowMenu(false) }}>Properties</NavLink>&nbsp;


              {

                (isAdmin) ? <NavLink to='/RegisterProperty' className={({ isActive }) => `sm:block hidden ${(isActive) ? 'text-orange-300' : 'text-white'} font-medium sm:text-base text-sm `}>Register Property</NavLink> : null
              }

            </div>
          </div>

          <div className='modals flex items-center md:gap-[30px] gap-[10px] '>

            {/* <h1 className='font-medium text-white md:text-sm text-xs p-1'>Hi, {userData?.name.toUpperCase()}</h1> */}
            <i className="fa-solid fa-bars text-white text-sm sm:hidden block" onClick={() => { setShowMenu(!showMenu) }}></i>
            <div className='sm:flex hidden sm:gap-2 gap-1 items-center '>
              <NavLink to='/Dashboard' className={({ isActive }) => `${(isActive) ? 'text-orange-300' : 'text-white'}  md:text-sm text-xs`} >
                <i className="fa-solid fa-user text-white"></i>&nbsp;
                Dashboard
              </NavLink>

              <span className='text-white'>|</span>

              <button className='text-white md:text-sm text-xs' onClick={() => { onHandleclick() }}>
                <i className="fa-solid fa-right-from-bracket text-white"></i>&nbsp;
                Logout
              </button>
            </div>

          </div>
        </div>


      </nav>

    </>
  )
}

export default Header