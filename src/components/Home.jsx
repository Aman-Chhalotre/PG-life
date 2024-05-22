import React, { useState } from 'react'
import '../css/home.css'
import SearchBar from './Search/SearchBar.jsx'
import delhi from '../assets/img/delhi.png'
import bangalore from '../assets/img/bangalore.png'
import mumbai from '../assets/img/mumbai.png'
import hyderabad from '../assets/img/hyderabad.png'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap/dist/gsap'
import { useEffect } from 'react'
import propertyService from '../appwrite/property.js'
import { useDispatch } from 'react-redux'
import { getProperties } from '../../store/propertySlice.js'


function Home() {

  const dispatch = useDispatch()

  const navigate = useNavigate()


  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.boxes', {
        opacity: 0,
        stagger: 0.3,
        y: 50,
        duration: 0.8,
      }), gsap.from('#bannerText,#bannerTextSpan,#cityLabel', {
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

  function handleclick(search) {
    const searchedCity = search
    propertyService.searchProperties(search)
      .then((response) => {

        const searchedProperties = response.documents.filter((property) => {
          const propertyName = property.city_name
          return propertyName.toUpperCase() == searchedCity
        })
        navigate('/properties_list')

        dispatch(getProperties(searchedProperties))
      })
  }

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

        {/* <div className='sm:h-96 mb-5 text-center pt-20 h-auto bg-white'>

          <h1 id='cityLabel' className='sm:text-4xl font-medium text-2xl'>Major Cities</h1>

          <div className='flex gap-5 justify-center mt-5 sm:flex-nowrap flex-wrap'>

            <div className='boxes p-2'>
              <img src={delhi} alt="" className='sm:h-32 h-20 cursor-pointer' onClick={() => { handleclick('NEW DELHI') }} />
            </div>

            <div className='boxes p-2'>
              <div onClick={() => { handleclick('MUMBAI') }}><img src={mumbai} alt="" className='sm:h-32 h-20 cursor-pointer' /></div>
            </div>

            <div className='boxes p-2'>
              <div onClick={() => { handleclick('BANGALORE') }}><img src={bangalore} alt="" className='sm:h-32 h-20 cursor-pointer' /></div>
            </div>

            <div className='boxes p-2'>
              <div onClick={() => { handleclick('HYDERABAD') }}><img src={hyderabad} alt="" className='sm:h-32 h-20 cursor-pointer' /></div>
            </div>

          </div>
        </div> */}


      </div>
    </>
  )
}

export default Home;