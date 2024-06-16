import React, { useEffect, useState } from 'react'
import './../css/dashboard.css'
import male from '../assets/img/male.png'
import female from '../assets/img/female.png'
import unisex from '../assets/img/unisex.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import interestedpropertiesService from '../appwrite/interestedProperties'
import propertyService from '../appwrite/property'
import { getPropertyId } from '../../store/propertySlice.js'


function Dashboard() {
  const [interestedProperties, setInterestedProperties] = useState([])

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const data = useSelector((state) => state.authReducer.userData)


  function handleClick(id) {
    dispatch(getPropertyId({ id }))

  }


  useEffect(() => {
    interestedpropertiesService.getInterestedProperties(data?.$id)
      .then((res) => {

        propertyService.getProperties()
          .then((response) => {
            // console.log(response.documents)
            let val = [];
            res.documents?.map((value) => {
              let result = response.documents.filter((property) => property.$id == value.property_id)
              val.push(result[0])
            })
            setInterestedProperties(val)


          })
      })
      .catch((err) => {
        console.log(err)
      })


  }, [])


  function RemoveInterestedProperty(id) {
    interestedpropertiesService.getInterestedProperties(data.$id)
      .then((res) => {

        res.documents.map((interestedProp) => {
          if (interestedProp.property_id === id) {
            interestedpropertiesService.deleteInterestedProperties(interestedProp.$id)
              .then(() => {
                navigate('/Dashboard')
              })
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })

  }

  return (
    <>
      <div id='main' className='mt-20 min:h-[100vh] h-auto flex flex-col items-center gap-4'>

        <div id='info' className='h-60 '>

          <div>
            <h1 className='sm:text-2xl text-center font-medium text-gray-700 text-xl'>My Profile</h1>
          </div>

          <div className='flex'>
            <div className='mt-10'>
              <i className="fa-solid fa-user text-slate-500 sm:text-8xl text-6xl"></i>
            </div>

            <div className='ps-10 w-full mt-10'>
              <h1 className='font-bold text-gray-700 sm:text-xl text-sm '>{data?.name.toUpperCase()}</h1>
              <h1 className='text-gray-600 sm:text-base text-xs'><i className="fa-regular fa-envelope sm:text-base text-xs"></i> {data?.email}</h1>
              <h1 className='text-gray-600 sm:text-base text-xs'><i className="fa-solid fa-phonesm:text-base text-xs"></i> {data?.phone}</h1>
              <div className='flex justify-between items-end'>

                <Link to='/Editpage' className='text-gray-600 text-xs underline mt-1.5'>Edit Profile</Link>
              </div>
            </div>
          </div>

        </div>


        <div>
          <h1 className='text-start text-xl font-semibold text-gray-500'>Interested Properties</h1>
        </div>
        {interestedProperties?.map((property) =>

          <div id='box' className='h-auto lg:w-[900px] sm:w-[650px] w-[90%] border p-3 mb-3 rounded flex sm:flex-row flex-col items-center shadow' key={property.id}>

            <div className=''>
              <img src={property.thumbnail_image} alt="" className='h-40 sm:w-80 w-[250px] rounded' />

            </div>

            <div className='sm:ms-3 w-full'>

              <div className='flex justify-between'>
                <div>

                  {('') ? <i className="fa-solid fa-star text-red-600 sm:text-lg text-sm" onClick={() => { setRating(!rating) }}></i> : <i className="fa-regular fa-star text-red-600 sm:text-lg text-sm" onClick={() => { setRating(!rating) }}></i>}

                </div>

                <div>
                  <button onClick={() => { RemoveInterestedProperty(property.$id) }}>

                    <h1 className='text-sm font-medium text-gray-600'>Remove</h1>

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

export default Dashboard