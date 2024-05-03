import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../modalcss/login.css'
import useLogin from '../../../context/login.js'
import useSignup from '../../../context/signup.js'
import { useForm } from 'react-hook-form'
import authService from '../../../appwrite/auth.js'
import { getUserData, login, logout } from '../../../../store/authSlice.js'
import { useDispatch } from 'react-redux'
import updateService from '../../../appwrite/upDate.js'



function Login_modal() {

  const { showLogin } = useLogin()
  const { setshowLogin } = useLogin()
  const { label, setshowSignup } = useSignup()

  const form = useForm()
  const { register, handleSubmit, reset, formState } = form
  const { errors } = formState

  const { isLoggedIn, phone } = useLogin()

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const onSubmit = (data) => {

    authService.login(String(data.email), String(data.password))
      .then((userData) => {
        if (userData) {

          updateService.updatePhone('+91' + String(phone), String(data.password))
            .then((response) => {
              // console.log(response)
            })
          authService.getPrefs()
            .then((val) => {

              if (Object.entries(val).length == 0 && label !== null) {
                if (label == 'admin') {
                  authService.updatePref(label)
                    .then((response) => {

                      if (response.prefs.label == 'admin') {
                        navigate('/RegisterProperty')
                      } else {
                        navigate('/')
                      }
                    })
                } else if (label == 'user') {
                  authService.updatePref(label)
                    .then((response) => {

                      if (response.prefs.label == 'user') {
                        navigate('/')
                      }
                    })
                }

              }

            })

          authService.getCurrentUser()
            .then((userData) => {

              if (userData) {
                dispatch(getUserData({ userData }))
              } else {
                dispatch(logout())
              }
            })
            .catch((error) => {
              console.log(error)
            })




          dispatch(login())
        } else {
          dispatch(logout())
        }
      })

    reset()
  }



  return (
    <>
      <div id='login-container' className={`md:w-[35%] sm:w-[40%] w-[80%] rounded mt-10 bg-black shadow-[#000000a2] shadow-xl transition-all ${(showLogin) ? 'block  blur-none' : 'hidden duration-100'} ${(isLoggedIn) ? 'hidden' : 'block'}`}>
        <div id="login_modal" className='text-center'>
          <h3 className='text-xl font-semibold text-white'>Login</h3>
          <hr />
          <form className='mt-5 flex flex-col items-center gap-2' onSubmit={handleSubmit(onSubmit)}>

            <input type="email" name="email" placeholder="Email" className=' sm:h-[50px] h-[40px] w-60 me-2 p-0.5 bg-transparent border-b border-gray-500 text-gray-300' {...register('email', {
              required: "* Email is required"
            })} />
            <p className='text-red-500 -mt-3 text-xs self-start ps-5'>{errors.email?.message}</p>

            <input type="password" name="password" placeholder="Password" className='sm:h-[50px] h-[40px] w-60 me-2 p-0.5 bg-transparent border-b border-gray-500 text-gray-300' {...register('password', {
              required: "* Password is required"
            })} />
            <p className='text-red-500 -mt-3 text-xs self-start ps-5'>{errors.password?.message}</p>

            <button type='submit' id='loginbutton' className='text-black w-24 rounded-lg py-1 font-medium mt-2 bg-white'>Login</button>
            <p className='signup_link mt-3 text-gray-500'>Create an Account <Link className='text-white' style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => { setshowSignup(true); setshowLogin(false) }}> Signup</Link></p>

          </form>
        </div>
      </div>
    </>
  )
}

export default Login_modal
