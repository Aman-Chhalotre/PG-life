import React, { useEffect, useState } from 'react'
import useSignup from '../../../context/signup.js'
import useLogin from '../../../context/login.js'
import { useForm } from 'react-hook-form'
import authService from '../../../appwrite/auth.js'
import { gsap } from 'gsap/dist/gsap'


function Signup_modal() {
  const [showPassword, setShowPassword] = useState(false)
  const [confirmation, setConfirmation] = useState(false)

  const { showSignup, isSignup, setshowSignup } = useSignup()
  const { showLogin, setshowLogin, setPhone } = useLogin()
  const { setLabel } = useSignup()




  function AccountCreated() {
    setConfirmation(true)
  }

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('#success', {
        opacity: 0,
        x: -50,
        duration: 0.8,
      })
      gsap.to('#success', {
        delay: 2.5,
        opacity: 0,
        y: 50,
        duration: 0.8,

      })
    }
    )
    return () => ctx.revert();
  }, [confirmation == true])

  const form = useForm()

  const { register, handleSubmit, reset, formState } = form
  const { errors } = formState


  const onSubmit = (data) => {
    setShowPassword(false)


    authService.createAccount(data.email, data.password, data.fullName)
      .then((response) => {


        setLabel(data.label)
        setPhone(String(data.phoneNumber))
        setshowSignup(false)
        setshowLogin(true)
        AccountCreated()

      })
      .catch((err) => {
        console.log(err)
      })


    reset()
  }

  return (
    <>

      <div id='success' className={`${(confirmation) ? 'flex' : 'hidden '}  md:p-5 p-1 md:w-80 w-52 absolute z-50 md:top-10 md:right-10 right-8 top-8 border-l-8 border-gray-200 bg-[#242427] shadow shadow-black `}>
        <h1 className=' text-green-500 font-semibold md:text-lg text-sm'>Account Created Successfully</h1>
      </div>

      <div id='signup-container' className={`h-[480px] sm:w-[40%] w-[75%] rounded-r-lg transition-all ${(showSignup) ? 'block' : 'hidden'} `} >

        <div id="signup_modal" className='text-center'>

          <div className='text-white'>
            <h1 className='sm:text-4xl text-2xl font-semibold'>Signup</h1>
            <h1 className='py-2 sm:text-base text-xs font-medium'>Create your account</h1>
          </div>

          <form id='signupForm' className='w-full mt-3 flex flex-col justify-center items-center gap-[15px]' onSubmit={handleSubmit(onSubmit)}>

            <div className='w-10/12'>
              <input type="text" name="fullName" placeholder="Full Name" className=' sm:h-[40px] h-[30px] w-10/12 p-0.5 bg-transparent border-b border-gray-500 text-gray-300 outline-none' {...register('fullName', {
                required: "* Full Name is required"
              })} />
              <p className='text-red-500 text-xs self-start '>{errors.fullName?.message}</p>
            </div>

            <div className='w-10/12'>
              <input type="number" name="phoneNumber" placeholder="Phone Number" className=' sm:h-[40px] h-[30px] w-10/12  p-0.5 bg-transparent border-b border-gray-500 text-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none' {...register('phoneNumber', {
                required: "* Phone Number is required"
              })} />
              <p className='text-red-500 text-xs self-start '>{errors.phoneNumber?.message}</p>
            </div>

            <div className='w-10/12'>
              <input type="email" name="email" placeholder="Email" className=' sm:h-[40px] h-[30px] w-10/12  p-0.5  bg-transparent border-b border-gray-500 text-gray-300 outline-none' {...register('email', {
                required: "* Email is required"
              })} />
              <p className='text-red-500  text-xs self-start '>{errors.email?.message}</p>
            </div>

            <div className='w-10/12'>
              <div className='relative'>
                <input id='password' type={`${(showPassword) ? 'text' : 'password'}`} name="password" placeholder="Password" className=' sm:h-[40px] h-[30px] w-10/12  p-0.5 bg-transparent border-b border-gray-500 text-gray-300 outline-none' maxLength={15} {...register('password', {
                  required: "* Password is required"
                })} />
                <i id='eye' className={`${(showPassword) ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'} text-white text-lg absolute z-10 right-[10%]`} onClick={() => { setShowPassword(!showPassword) }}></i>
              </div>
              <p className='text-red-500 text-xs self-start '>{errors.password?.message}</p>
            </div>

            <div className='flex sm:flex-row flex-col items-center gap-3'>

              <div className=' flex items-baseline gap-2'>
                <h1 className='text-white font-normal'>You want to :</h1>

                <select name="label" id="label" className=' bg-white text-black font-semibold p-1 rounded outline-none '{...register('label', {
                  required: '* Please select one'
                })}>

                  <option value="user" defaultValue={true} className='sm:text-sm text-xs bg-white text-black'>Explore Properties</option>
                  <option value="admin" className='sm:text-sm text-xs bg-white text-black'>Register Property</option>

                </select>

              </div>
            </div>
            <p className='text-red-500 -mt-3 text-xs self-start ps-5 text-center'>{errors.label?.message}</p>

            <button type='submit' id='signupbutton' className='text-black w-64 rounded-lg py-2 font-medium mt-2 bg-white ' >
              <i className="fa-solid fa-user"></i>&nbsp;
              Sign up
            </button>

            <div className='flex text-white gap-[5px]'>
              <h1 className='sm:text-base text-sm '>Already have an Account?</h1>
              <button className={`sm:text-base text-sm border-none rounded-r-lg transition-all font-medium underline`} onClick={() => { setshowLogin(!showLogin); setshowSignup(false) }}>

                Login
              </button>
            </div>


          </form>

        </div>
      </div>

    </>
  )
}

export default Signup_modal