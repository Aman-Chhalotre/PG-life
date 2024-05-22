import React, { useState } from 'react'
import './modalcss/modal.css'
import Login_modal from './login_modal/Login_modal'
import Signup_modal from './signup_modal/Signup_modal'
import useSignup from '../../context/signup';
import useLogin from '../../context/login';
import RegisterProperty from './registerProperty/RegisterProperty';

function Modals() {
  const [show, setShow] = useState(true)
  const { showLogin } = useLogin()
  const { setshowLogin } = useLogin()

  const { showSignup } = useSignup()
  const { setshowSignup } = useSignup()


  return (
    <>
      <div id='modal' className='h-screen w-full'>

        <div className='h-full w-full flex  justify-center items-center '>

          <Login_modal />
          <Signup_modal />

        </div>

      </div>
    </>
  )
}

export default Modals;