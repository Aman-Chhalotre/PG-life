import React from 'react'
import { Link } from 'react-router-dom'
import useSignup from '../../../context/signup.js'
import useLogin from '../../../context/login.js'
import { useForm } from 'react-hook-form'
import authService from '../../../appwrite/auth.js'
import { useSelector, useDispatch } from 'react-redux'


function Signup_modal() {


  const { showSignup, isSignup, setshowSignup } = useSignup()
  const { setshowLogin, setPhone } = useLogin()
  const  {setLabel} = useSignup()
  const form = useForm()

  const { register, handleSubmit, reset, formState } = form
  const { errors } = formState


  const onSubmit = (data) => {


    authService.createAccount(data.email, data.password, data.fullName)
      .then((response) => {
        
        // console.log(response)
        alert("Account Created Successfully")
        setLabel(data.label)
        setPhone(data.phoneNumber)
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
      <div id='login-container' className={`md:w-[35%] sm:w-[40%] w-[70%] rounded mt-10 bg-black shadow-[#000000a2] shadow-xl transition-all ${(showSignup) ? 'block duration-500 blur-none ' : 'hidden duration-100'} ${(isSignup) ? 'hidden' : 'block'}`} >
        <div id="signup_modal" className=''>
          <h3 className='text-xl font-semibold text-white text-center'>Signup</h3>
          <hr />

          <form className='mt-4 flex flex-col items-center gap-2' onSubmit={handleSubmit(onSubmit)}>


            <input type="text" name="fullName" placeholder="Full Name" className=' sm:h-[50px] h-[40px] w-10/12 me-2 p-0.5 bg-transparent border-b border-gray-500 border-l-0 text-gray-300 ' {...register('fullName', {
              required: "* Full Name is required"
            })} />
            <p className='text-red-500 -mt-3 text-xs self-start ps-5'>{errors.fullName?.message}</p>


            <input type="text" name="phoneNumber" placeholder="Phone Number" className=' sm:h-[50px] h-[40px] w-10/12 me-2 p-0.5 bg-transparent border-b border-gray-500 text-gray-300' {...register('phoneNumber', {
              required: "* Phone Number is required"
            })} />
            <p className='text-red-500 -mt-3 text-xs self-start ps-5'>{errors.phoneNumber?.message}</p>


            <input type="email" name="email" placeholder="Email" className=' sm:h-[50px] h-[40px] w-10/12 me-2 p-0.5  bg-transparent border-b border-gray-500 text-gray-300' {...register('email', {
              required: "* Email is required"
            })} />
            <p className='text-red-500 -mt-3 text-xs self-start ps-5'>{errors.email?.message}</p>


            <input type="password" name="password" placeholder="Password" className=' sm:h-[50px] h-[40px] w-10/12 me-2 p-0.5 bg-transparent border-b border-gray-500 text-gray-300' {...register('password', {
              required: "* Password is required"
            })} />
            <p className='text-red-500 -mt-3 text-xs self-start ps-5'>{errors.password?.message}</p>

            <div className='flex lg:flex-row flex-col gap-4 items-center'>
              <div className='flex items-center gap-2'>
                <label htmlFor="explore" className='text-white md:text-base text-sm'>Explore Properties</label>
                <input type="radio" id='explore' name='label' value='user' {...register('label',{
                  required:'* Please select one'
                })}/>
              </div>
              <div className='flex items-center gap-2'>
                <label htmlFor="register" className='text-white md:text-base text-sm'>Register Property</label>
                <input type="radio" id='register' name='label' value='admin' {...register('label',{
                  required:'* Please select one'
                })}/>
              </div>
            </div>
            <p className='text-red-500 -mt-3 text-xs self-start ps-5 text-center'>{errors.label?.message}</p>

            <button type='submit' id='signupbutton' className='text-black w-24 rounded-lg py-1 font-medium mt-2 bg-white' >Sign up</button>
            <p className='signup_link mt-3 text-gray-500'>Already have an Account?<Link className='text-white' style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => { setshowLogin(true); setshowSignup(false) }}> Login</Link></p>

          </form>

        </div>
      </div>
    </>
  )
}

export default Signup_modal