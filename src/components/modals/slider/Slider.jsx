import React, { useEffect } from 'react'
import { gsap } from 'gsap/dist/gsap'
import useSignup from '../../../context/signup.js'
import useLogin from '../../../context/login.js'

function Slider() {

    const { showLogin, setshowLogin } = useLogin()

    const { showSignup, isSignup, setshowSignup } = useSignup()


    useEffect(() => {


        let ctx = gsap.context(() => {
            if (!showLogin) {

                gsap.from('#slider', {
                    right: '0',
                    duration: 0.3,
                })
            }
            if (showLogin) {

                gsap.to('#slider', {
                    x: '100%',
                    duration: 0.3,
                })
            }

        }
        )

        return () => ctx.revert();
    }, [showLogin])



    return (
        <>
            <div id='slider' className='h-[480px] w-[50%] rounded absolute z-50 border '>
                {(showLogin) ?
                    <div className={`h-full rounded-r-lg shadow-[#000000a2] shadow-xl transition-all bg-white text-center flex flex-col justify-between py-12`}>
                        <div>
                            <h1 className='sm:text-4xl text-2xl font-semibold'>Welcome Back</h1>
                            <h1 className='py-2 font-medium sm:text-base text-xs'>Login to your account</h1>
                        </div>
                        <div>
                            <h1 className='sm:text-base text-sm font-medium'>Dont have an account</h1>
                            <button className={`sm:text-base text-sm py-1 px-3 rounded-l-lg transition-all text-black`} onClick={() => { setshowLogin(!showLogin) }}>
                                Signup
                            </button>
                        </div>
                    </div>
                    :
                    <div className={`h-full rounded-l-lg shadow-[#000000a2] shadow-xl transition-all bg-white text-center flex flex-col justify-between py-12`}>
                        <div className=''>
                            <h1 className='sm:text-4xl text-2xl font-semibold'>Signup</h1>
                            <h1 className='py-2 sm:text-base text-xs font-medium'>Create your account</h1>
                        </div>
                        <div>
                            <h1 className='sm:text-base text-sm font-medium'>Already have an Account?</h1>
                            <button className={`sm:text-base text-sm border-none py-1 px-3 rounded-r-lg transition-all text-black`} onClick={() => { setshowLogin(!showLogin); }}>

                                Login
                            </button>
                        </div>
                    </div>}
            </div>

        </>
    )
}

export default Slider