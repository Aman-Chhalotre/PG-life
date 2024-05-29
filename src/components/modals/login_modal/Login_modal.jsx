import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLogin from '../../../context/login.js'
import useSignup from '../../../context/signup.js'
import { useForm } from 'react-hook-form'
import authService from '../../../appwrite/auth.js'
import { getUserData, login, logout } from '../../../../store/authSlice.js'
import { useDispatch } from 'react-redux'
import updateService from '../../../appwrite/upDate.js'



function Login_modal() {
  const [showPassword, setShowPassword] = useState(false)

  const { showLogin } = useLogin()
  const { setshowLogin } = useLogin()
  const { label, setshowSignup } = useSignup()



  const form = useForm()
  const { register, handleSubmit, reset, formState } = form
  const { errors } = formState

  const { phone } = useLogin()

  const dispatch = useDispatch()

  const navigate = useNavigate()


  const onSubmit = (data) => {
    setShowPassword(false)

    authService.login(String(data.email), String(data.password))
      .then((userData) => {
        if (userData) {

          updateService.updatePhone('+91' + String(phone), String(data.password))
            .then((response) => {
              // console.log(response)
            })

          console.log(label)

          authService.getPrefs()
            .then((val) => {
              console.log(val)
              if (Object.entries(val).length == 0 && label !== null) {

                authService.updatePref(label)
                  .then((response) => {
                    console.log(response)

                    if (response.prefs.label == 'admin') {
                      navigate('/RegisterProperty')
                    } else {
                      navigate('/')
                    }
                  })


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


      <div id='login-container' className={`h-[480px] sm:w-[40%] w-[75%] py-2 transition-all ${(showLogin) ? 'block' : 'hidden'}`}>
        <div id="login_modal" className='text-center '>

          <div className='text-white'>
            <h1 className='sm:text-4xl text-2xl font-semibold'>Welcome Back</h1>
            <h1 className='py-2 font-medium sm:text-base text-xs'>Login to your account</h1>
          </div>

          <form className='mt-16 flex flex-col justify-center items-center text-center gap-[10px]' onSubmit={handleSubmit(onSubmit)}>

            <input type="email" name="email" placeholder="Email" className=' sm:h-[50px] h-[40px] w-8/12 me-2 p-0.5 bg-transparent border-b border-gray-500 text-gray-300 outline-none' {...register('email', {
              required: "* Email is required"
            })} />
            <p className='text-red-500 text-xs '>{errors.email?.message}</p>

            <div className='relative w-full'>
              <input type={`${(showPassword) ? 'text' : 'password'}`} name="password" placeholder="Password" className='sm:h-[50px] h-[40px] w-8/12 me-2 p-0.5 bg-transparent border-b border-gray-500 text-gray-300 outline-none' {...register('password', {
                required: "* Password is required"
              })} />
              <i id='eye' className={`${(showPassword) ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'} text-white text-lg absolute z-10 right-24`} onClick={() => { setShowPassword(!showPassword) }}></i>
            </div>
            <p className='text-red-500 text-xs'>{errors.password?.message}</p>

            <button type='submit' id='loginbutton' className='text-black w-56 rounded-lg py-1 font-medium mt-2 bg-white'>
              <i className="fa-solid fa-right-to-bracket"></i>&nbsp;
              Login
            </button>
            {/* <p className='signup_link mt-3 text-gray-500'>Create an Account <Link className='text-white' style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => { setshowSignup(true); setshowLogin(false) }}> Signup</Link></p> */}
            <div className='text-white flex gap-[5px]'>
              <h1 className='sm:text-base text-sm '>Dont have an account?</h1>
              <button className={`sm:text-base text-sm rounded-l-lg transition-all font-medium`} onClick={() => { setshowLogin(!showLogin); setshowSignup(true) }}>
                Signup
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default Login_modal
