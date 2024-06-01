import React, { useState } from 'react'
import '../css/home.css'
import SearchBar from './Search/SearchBar.jsx'
import { gsap } from 'gsap/dist/gsap'
import { useEffect } from 'react'


function Home() {


  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.boxes', {
        delay: 1,
        opacity: 0,
        stagger: 0.3,
        y: 50,
        duration: 0.8,
      }), gsap.from('#bannerText,#bannerTextSpan', {
        delay: 0.5,
        opacity: 0,
        y: -50,
        duration: 1,
        stagger: 0.5
      }), gsap.from('#bannerTextSpan,#bannerText', {
        duration: 2,
        color: 'black',
        delay: 2,
      })
    }
    )
    return () => ctx.revert();
  }, [])


  return (
    <>

      <div className='h-[100vh] bg-transparent'>
        <div id='bg' className=' relative h-[560px] w-full bg-cover bg-no-repeat bg-bottom'>

          <div id='banner' className='absolute z-50 h-96 w-full flex flex-col justify-center items-center ps-10 gap-5'>

            <h1 id='bannerText' className='md:text-5xl font-medium mt-10 overflow-hidden sm:text-4xl text-2xl text-white  '><span
              id='bannerTextSpan' className='text-[#E58B3A]'>Happiness</span> per Square Foot</h1>
            <SearchBar></SearchBar>

          </div>

        </div>

      </div>
    </>
  )
}

export default Home;