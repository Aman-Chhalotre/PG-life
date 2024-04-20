import React, { useState } from 'react'
import './../css/properties_list.css'
import filter from '../assets/img/filter.png'
import Filter from './filter/Filter.jsx'
import male from '../assets/img/male.png'
import female from '../assets/img/female.png'
import unisex from '../assets/img/unisex.png'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap/dist/gsap'
import { useEffect } from 'react'
import propertyService from '../appwrite/property.js'
import { useDispatch, useSelector } from 'react-redux'
import { getProperties } from '../../store/propertySlice.js'
import { getPropertyId } from '../../store/propertySlice.js'



function Properties_List() {
  const [rating, setRating] = useState(false)
  const [showfilter, setShowfilter] = useState(false)


  const dispatch = useDispatch()


  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('#box', {
        x: 100,
        stagger: 0.2,
        opacity: 0,
        duration: 1
      })
    }
    )
    return () => ctx.revert();
  }, [])



  function handleClick(id) {
    dispatch(getPropertyId({ id }))
  }

  function showAllProperties() {
    propertyService.getProperties()
      .then((response) => {
        console.log(response.documents)
        dispatch(getProperties(response.documents))
      })
  }


  const properties = useSelector((state) => state.propertyReducer.properties)
  return (
    <>
      <Filter showfilter={showfilter} setShowfilter={setShowfilter}></Filter>
      <div className={`relative ${(showfilter) ? 'blur-sm duration-200' : 'blur-0 duration-200'} flex flex-col gap-5 items-center pb-8`}>


        <div className='h-16 p-5 flex gap-2'>
          <div className='flex cursor-pointer' onClick={() => { setShowfilter(!showfilter) }}>
            <img src={filter} alt="" className='h-8 ' />
            <h1 className='text-lg font-semibold text-gray-600'>Filter</h1>
          </div>
        </div>
        <h1 className='text-xs text-white text bg-[#353535] py-1 px-2 rounded ms-2 cursor-pointer' onClick={() => { showAllProperties() }}>Show All Properties</h1>



        {properties?.map((property) =>

          <div id='box' className='h-auto lg:w-[900px] sm:w-[650px] w-[90%] border p-3 rounded flex sm:flex-row flex-col items-center' key={property.id}>

            <div className=''>
              <img src={property.thumbnail_image} alt="" className='h-40 sm:w-80 w-[250px] rounded' />

            </div>

            <div className='sm:ms-3 w-full'>

              <div className='flex justify-between'>
                <div>

                  {(rating) ? <i className="fa-solid fa-star text-red-600 sm:text-lg text-sm" onClick={() => { setRating(!rating) }}></i> : <i className="fa-regular fa-star text-red-600 sm:text-lg text-sm" onClick={() => { setRating(!rating) }}></i>}

                </div>

                <div>
                  <button>

                    {(property.interested) ? <i className="fa-solid fa-heart text-red-600 sm:text-lg text-sm"></i> : <i className="fa-regular fa-heart text-red-600 sm:text-lg text-sm"></i>}

                  </button>

                </div>

              </div>

              <div className='mt-2'>
                <h1 className='font-medium text-lg text-gray-700'>{property.name}</h1>
                <h1 className='pt-1 text-xs text font-medium text-slate-500'>{property.address}</h1>
                <h1 className='pt-1 text-xs text font-medium text-slate-500'>{property.city_name}</h1>
                {
                  (property.gender == 'male') ? <img src={male} alt="" className='h-10 mt-2' /> :
                    (property.gender == 'female') ? <img src={female} alt="" className='h-10 mt-2' /> :
                      (property.gender == 'unisex') ? <img src={unisex} alt="" className='h-10 mt-2' /> : null

                }

              </div>

              <div className='sm:mt-5 mt-2 flex sm:flex-row sm:gap-0 justify-between flex-col gap-2 items-end'>

                <div className='flex items-center'>
                  <h1 className='font-medium text-gray-700 sm:text-xl text-lg'>₹ {property.rent}</h1>
                  &nbsp;
                  <h1 className='text-xs text-gray-600'>per month</h1>
                </div>

                <div>
                  <Link to='/Property_Detail' onClick={() => { handleClick(property.$id) }} className='bg-cyan-600 w-24 p-1 px-5 rounded text-white font-medium hover:bg-cyan-700 '>View</Link>
                </div>
              </div>

            </div>
          </div>


        )}

      </div>
    </>
  )
}

export default Properties_List