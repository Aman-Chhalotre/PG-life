import React from 'react'
import './modalcss/modal.css'
import Login_modal from './login_modal/Login_modal'
import Signup_modal from './signup_modal/Signup_modal'

function Modals() {



  return (
    <>
      <div id='modal' className='h-screen w-full'>

        <div className='h-full w-full flex justify-center items-center '>

          <Login_modal />
          <Signup_modal />

        </div>

      </div>
    </>
  )
}

export default Modals;