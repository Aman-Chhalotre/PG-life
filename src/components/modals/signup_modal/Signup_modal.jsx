import React, { useEffect } from 'react'
import { gsap } from 'gsap/dist/gsap'
import useSignup from '../../../context/signup.js'
import useLogin from '../../../context/login.js'
import { useForm } from 'react-hook-form'
import authService from '../../../appwrite/auth.js'
import { useSelector, useDispatch } from 'react-redux'


function Signup_modal() {


  const { showSignup, isSignup, setshowSignup } = useSignup()
  const { setshowLogin, setPhone } = useLogin()
  const { setLabel } = useSignup()

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('#signup-container', {
        x: 300,
        duration: 0.5,
      })
    }
    )
    return () => ctx.revert();
  }, [showSignup])


  const form = useForm()

  const { register, handleSubmit, reset, formState } = form
  const { errors } = formState


  const onSubmit = (data) => {


    authService.createAccount(data.email, data.password, data.fullName)
      .then((response) => {

        // console.log(response)
        alert("Account Created Successfully")
        setLabel(data.label)
        setPhone(String(data.phoneNumber))
        setshowSignup(false)
        setshowLogin(true)

      })
      .catch((err) => {
        console.log(err)
      })


    reset()
  }

  return (
    <>
      <div className={`${(!showSignup) ? 'block' : 'hidden'} h-full sm:w-[50%] w-[30%] rounded-r-lg shadow-[#000000a2] shadow-xl transition-all bg-white 
      text-center flex flex-col justify-between py-12`}>
        <div>
          <h1 className='sm:text-4xl text-2xl font-semibold'>Welcom Back</h1>
          <h1 className='py-2 font-medium sm:text-base text-xs'>Login to your account</h1>
        </div>
        <div>
          <h1 className='sm:text-base text-sm font-medium'>Dont have an account</h1>
          <button className={`sm:text-sm border-none text-sm py-1 px-3 rounded-l-lg transition-all text-black`} onClick={() => { setshowSignup(!showSignup); setshowLogin(false) }}>
            Signup
          </button>
        </div>
      </div>


      <div id='signup-container' className={`h-full sm:w-[50%] w-[75%] rounded-r-lg bg-black shadow-[#000000a2] shadow-xl transition-all ${(showSignup) ? 'block duration-500 blur-none ' : 'hidden duration-100'} ${(isSignup) ? 'hidden' : 'block'}`} >

        <div id="signup_modal" className=''>


          <form id='signupForm' className='mt-3 flex flex-col items-center gap-[15px]' onSubmit={handleSubmit(onSubmit)}>

            <div className='w-10/12'>
              <input type="text" name="fullName" placeholder="Full Name" className=' sm:h-[40px] h-[30px] w-10/12 p-0.5 bg-transparent border-b border-gray-500 text-gray-300 ' {...register('fullName', {
                required: "* Full Name is required"
              })} />
              <p className='text-red-500 text-xs self-start '>{errors.fullName?.message}</p>
            </div>

            <div className='w-10/12'>
              <input type="number" name="phoneNumber" placeholder="Phone Number" className=' sm:h-[40px] h-[30px] w-10/12  p-0.5 bg-transparent border-b border-gray-500 text-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' {...register('phoneNumber', {
                required: "* Phone Number is required"
              })} />
              <p className='text-red-500 text-xs self-start '>{errors.phoneNumber?.message}</p>
            </div>

            <div className='w-10/12'>
              <input type="email" name="email" placeholder="Email" className=' sm:h-[40px] h-[30px] w-10/12  p-0.5  bg-transparent border-b border-gray-500 text-gray-300' {...register('email', {
                required: "* Email is required"
              })} />
              <p className='text-red-500  text-xs self-start '>{errors.email?.message}</p>
            </div>

            <div className='w-10/12'>
              <input type="password" name="password" placeholder="Password" className=' sm:h-[40px] h-[30px] w-10/12  p-0.5 bg-transparent border-b border-gray-500 text-gray-300' {...register('password', {
                required: "* Password is required"
              })} />
              <p className='text-red-500 text-xs self-start '>{errors.password?.message}</p>
            </div>

            <h1 className='text-white font-normal'>You want to :</h1>
            <div className='flex sm:flex-row flex-col items-center gap-3'>

              <div className=' flex items-baseline gap-2'>
                <label htmlFor="explore" className='text-white md:text-sm text-xs'>Explore Properties</label>
                <input type="radio" id='explore' name='label' value='user' className=' ' {...register('label', {
                  required: '* Please select one'
                })} />
              </div>

              <div className='flex items-baseline gap-2'>
                <label htmlFor="register" className='text-white md:text-sm text-xs'>Register Property</label>
                <input type="radio" id='register' name='label' value='admin'  {...register('label', {
                  required: '* Please select one'
                })} />
              </div>
            </div>
            <p className='text-red-500 -mt-3 text-xs self-start ps-5 text-center'>{errors.label?.message}</p>

            <button type='submit' id='signupbutton' className='text-black w-52 rounded-lg py-1 font-medium mt-2 bg-white' >
              <i className="fa-solid fa-user"></i>&nbsp;
              Sign up
            </button>


          </form>

        </div>
      </div>
    </>
  )
}

export default Signup_modal