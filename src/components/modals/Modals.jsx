import React, { useState } from 'react'
import './modalcss/modal.css'
import Login_modal from './login_modal/Login_modal'
import Signup_modal from './signup_modal/Signup_modal'
import useSignup from '../../context/signup';
import useLogin from '../../context/login';
import RegisterProperty from './registerProperty/RegisterProperty';

function Modals() {
  const [show, setShow] = useState(true)
  const [showRegisterProperty, setshowRegisterProperty] = useState(false)
  const { showLogin } = useLogin()
  const { setshowLogin } = useLogin()

  const { showSignup } = useSignup()
  const { setshowSignup } = useSignup()


  return (
    <>
      <div id='modal' className='h-screen'>

        

        {(!showRegisterProperty) ?

          <div>
            
            <div className="modals p-3 flex justify-center text-white">
              <button className={`sm:text-lg border-none text-sm py-1 px-3 rounded-l-lg transition-all ${(showSignup)? 'bg-white text-black' : 'bg-black text-white'}`} onClick={() => { setshowSignup(!showSignup); setshowLogin(false) }}>
                <i className="fa-solid fa-user"></i>&nbsp;
                Signup
              </button>

              <button className={`sm:text-lg border-none text-sm py-1 px-3 rounded-r-lg transition-all ${(showLogin)? 'bg-white text-black' : 'bg-black text-white'}`} onClick={() => { setshowLogin(!showLogin); setshowSignup(false) }}>
                <i className="fa-solid fa-right-to-bracket"></i>&nbsp;
                Login
              </button>
            </div>
            <div className=' flex justify-center items-center'>
              <Login_modal />
              <Signup_modal />
            </div>
          </div>
          :
          <RegisterProperty />
        }


      </div>
    </>
  )
}

export default Modals;