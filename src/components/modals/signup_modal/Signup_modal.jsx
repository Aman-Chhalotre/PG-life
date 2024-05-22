import React from 'react'
import useSignup from '../../../context/signup.js'
import useLogin from '../../../context/login.js'
import { useForm } from 'react-hook-form'
import authService from '../../../appwrite/auth.js'
import { useSelector, useDispatch } from 'react-redux'


function Signup_modal() {


  const { showSignup, isSignup, setshowSignup } = useSignup()
  const { showLogin, setshowLogin, setPhone } = useLogin()
  const { setLabel } = useSignup()


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
              <input type="password" name="password" placeholder="Password" className=' sm:h-[40px] h-[30px] w-10/12  p-0.5 bg-transparent border-b border-gray-500 text-gray-300 outline-none' {...register('password', {
                required: "* Password is required"
              })} />
              <p className='text-red-500 text-xs self-start '>{errors.password?.message}</p>
            </div>

            <div className='flex sm:flex-row flex-col items-center gap-3'>

              <div className=' flex items-baseline gap-2'>
                <h1 className='text-white font-normal'>You want to :</h1>
                {/* <label htmlFor="explore" className='text-white md:text-sm text-xs'>Explore Properties</label>
                <input type="radio" id='explore' name='label' value='user' className=' ' {...register('label', {
                  required: '* Please select one'
                })} />
              </div>

              <div className='flex items-baseline gap-2'>
                <label htmlFor="register" className='text-white md:text-sm text-xs'>Register Property</label>
                <input type="radio" id='register' name='label' value='admin'  {...register('label', {
                  required: '* Please select one'
                })} /> */}
                <select name="label" id="label" className=' bg-black p-2 rounded outline-none text-white focus:bg-transparent'{...register('label', {
                  required: '* Please select one'
                })}>
                  <option value="user" defaultValue={true}>Explore Properties</option>
                  <option value="admin">Register Property</option>
                </select>

              </div>
            </div>
            <p className='text-red-500 -mt-3 text-xs self-start ps-5 text-center'>{errors.label?.message}</p>

            <button type='submit' id='signupbutton' className='text-black w-80 rounded-lg py-2 font-medium mt-2 bg-white ' >
              <i className="fa-solid fa-user"></i>&nbsp;
              Sign up
            </button>

            <div className='flex text-white gap-[5px]'>
              <h1 className='sm:text-base text-sm font-medium'>Already have an Account?</h1>
              <button className={`sm:text-base text-sm border-none rounded-r-lg transition-all`} onClick={() => { setshowLogin(!showLogin); setshowSignup(false) }}>

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