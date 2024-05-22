import React from 'react'
import '../modalcss/modal.css'
import { useForm, useFieldArray } from 'react-hook-form'
import propertyService from '../../../appwrite/property'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function RegisterProperty() {

  const form = useForm({
    defaultValues: {
      name: '',
      address: '',
      cityName: '',
      rent: '',
      gender: '',
      amenities: [],
      description: '',
      images: [
        { image: '' },
        { image: '' },
        { image: '' }
      ]

    }
  })

  const { register, handleSubmit, control, reset, formState } = form
  const { errors } = formState

  const { fields, append, remove } = useFieldArray({
    name: 'images',
    control,
  })

  const navigate = useNavigate()


  const userdata = useSelector((state) => state.authReducer.userData)

  function onSubmit(data) {

    const cityName = data.cityName

    propertyService.createProperty(data.name, data.address, data.description, data.gender,
      Number(data.rent), cityName.toUpperCase(), data.amenities, userdata.$id)
      .then((value) => {
        console.log(value)
        data.images.map((val) => {
          propertyService.storeImages(val.image[0])
            .then((response) => {

              propertyService.getImageUrl(response.$id)
                .then((res) => {

                  propertyService.storePropertyImages(res.href, value.$id)
                    .then((res) => {
                      console.log(res)

                    })
                  console.log(value.$id)
                  console.log(res.href)
                  console.log(userdata.$id)
                  propertyService.setThumbnailImage(value.$id, res.href, userdata.$id)
                    .then((res) =>
                      console.log(res)
                    )
                    .catch((err) => {
                      console.log(err)
                    })
                })
              navigate('/')
            })
        })

      })

      .catch((err) => {
        console.log(err)
      })

  }

  return (
    <>
      <div id='modal' className=' '>
        <div className='py-5 flex flex-col gap-5 items-center justify-center'>
          <h1 className='text-white sm:text-4xl text-2xl font-medium text-center'>Register Property</h1>
          <button className='self-center sm:text-sm text-xs font-bold bg-white sm:p-2 p-1 rounded' onClick={() => { navigate('/') }}>Skip for now</button>



          <form className=' sm:w-[80%] w-[100%] flex flex-col gap-5 p-3 '>

            <div className='flex sm:flex-row flex-col gap-3 items-center'>

              <div className='sm:w-[80%] w-[100%]'>
                <input type="text" id='name' name='name' placeholder='Property Name' className='sm:p-2 p-1 ps-2 w-[100%] bg-transparent border-b text-white font-semibold sm:text-lg text-sm' {...register("name", {
                  required: "*Property Name is required"
                })} />
                <p className='text-red-600 sm:text-sm text-xs'>{errors.name?.message}</p>
              </div>

              <div className='sm:w-[80%] w-[100%]'>
                <input type="text" id='address' name='address' placeholder='Property Address' className=' sm:p-2 p-1 ps-2 w-[100%] bg-transparent border-b text-white font-semibold sm:text-lg text-sm' {...register("address", {
                  required: "*Property Address is required"
                })} />
                <p className='text-red-600 sm:text-sm text-xs'>{errors.address?.message}</p>
              </div>

            </div>

            <div className='flex sm:flex-row flex-col gap-3 items-center justify-center'>
              <div>
                <input type="text" id='cityName' name='cityName' placeholder='City Name' className='sm:p-2 p-1 ps-2 w-auto bg-transparent border-b text-white font-semibold sm:text-lg text-sm' {...register("cityName", {
                  required: "*City is required"
                })} />
                <p className='text-red-600 sm:text-sm text-xs'>{errors.cityName?.message}</p>
              </div>


              <div>
                <input type="number" id='rent' name='rent' placeholder='Property Rent' className='sm:p-2 p-1 ps-2 w-auto bg-transparent border-b text-white font-semibold sm:text-lg text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' {...register("rent", {
                  required: "*Rent is required"
                })} />
                <p className='text-red-600 sm:text-sm text-xs'>{errors.rent?.message}</p>
              </div>


            </div>

            <div className='flex sm:flex-row flex-col sm:gap-3 gap-2 justify-center items-center'>
              <h1 className='text-white font-medium sm:text-base text-sm'>Property for :</h1>
              <div className='flex gap-1'>
                <input type="radio" id='female' name='gender' className='accent-black' value='Female'  {...register("gender", {
                  required: "*gender is required"
                })} />
                <label htmlFor="female" className='sm:text-lg text-sm text-white font-medium '>Only Female</label>
              </div>

              <div className='flex gap-1'>
                <input type="radio" id='male' name='gender' className='accent-black' value='Male' {...register("gender", {
                  required: "*gender is required"
                })} />
                <label htmlFor="male" className='sm:text-lg text-sm text-white font-medium'>Only Male</label>
              </div>

              <div className='flex gap-1'>
                <input type="radio" id='anyone' name='gender' className='accent-black' value='unisex' {...register("gender", {
                  required: "*gender is required"
                })} />
                <label htmlFor="anyone" className='sm:text-lg text-sm text-white font-medium'>anyone</label>
              </div>
            </div>
            <p className='text-red-600 sm:text-sm text-xs text-center'>{errors.gender?.message}</p>


            <h1 className='sm:text-lg text-sm text-center font-semibold text-white'>Choose Amenities of your Property</h1>
            <div className='text-white flex flex-col justify-center gap-3 items-center'>

              <div className='flex flex-col gap-3 text-start font-semibold sm:text-base text-xs'>


                <div className='flex gap-2'>
                  <label htmlFor="ac">Air Conditioner</label>
                  <input id='ac' name='amenities' type="checkbox" value='AC' {...register("amenities")} />
                </div>

                <div className='flex gap-2'>
                  <label htmlFor="bed">Bed</label>
                  <input id='bed' type="checkbox" name='amenities' value="Bed" {...register("amenities")} />
                </div>

                <div className='flex gap-2'>
                  <label htmlFor="cctv">CCTV</label>
                  <input id='cctv' type="checkbox" name='amenities' value="CCTV" {...register("amenities")} />
                </div>

                <div className='flex gap-2'>
                  <label htmlFor="dining">Dining</label>
                  <input id='dining' type="checkbox" name='amenities' value="Dining" {...register("amenities")} />
                </div>

                <div className='flex gap-2'>
                  <label htmlFor="fireExtinguisher">Fire Extinguisher</label>
                  <input id='fireExtinguisher' type="checkbox" name='amenities' value="Fire Extinguisher" {...register("amenities")} />
                </div>

                <div className='flex gap-2'>
                  <label htmlFor="geyser">Geyser</label>
                  <input id='geyser' type="checkbox" name='amenities' value="Geyser" {...register("amenities")} />
                </div>


              </div>

              <div className='flex flex-col gap-3 text-start font-semibold sm:text-base text-xs'>


                <div className='flex gap-2'>
                  <label htmlFor="parking">Parking</label>
                  <input id='parking' type="checkbox" name='amenities' value="Parking" {...register("amenities")} />
                </div>

                <div className='flex gap-2'>
                  <label htmlFor="powerBackup">Power Backup</label>
                  <input id='powerBackup' type="checkbox" name='amenities' value="Power Backup" {...register("amenities")} />
                </div>

                <div className='flex gap-2'>
                  <label htmlFor="roWater">RO water</label>
                  <input id='roWater' type="checkbox" name='amenities' value="RO water" {...register("amenities")} />
                </div>

                <div className='flex gap-2'>
                  <label htmlFor="tv">TV</label>
                  <input id='tv' type="checkbox" name='amenities' value="TV" {...register("amenities")} />
                </div>

                <div className='flex gap-2'>
                  <label htmlFor="wifi">Wifi</label>
                  <input id='wifi' type="checkbox" name='amenities' value="Wifi" {...register("amenities")} />
                </div>

              </div>
            </div>

            <div className='flex gap-3 items-center justify-center'>

              <div className='sm:w-[80%] w-[100%]'>

                <textarea name='description' placeholder='Property Description' className='h-[100px] p-2 w-[100%]  rounded text-black font-semibold sm:text-lg text-sm' {...register("description", {
                  required: "*gender is required"
                })} />
                <p className='text-red-600 sm:text-sm text-xs text-center'>{errors.description?.message}</p>
              </div>

            </div>

            {/* <div className='flex justify-center'>
              <button type='submit' className='bg-white w-[100px] rounded p-1 font-medium'>Submit</button>
            </div> */}

          </form>

          <form className=' sm:w-[80%] w-[100%]' onSubmit={handleSubmit(onSubmit)}>
            <h1 className='text-xl text-white font-medium text-center mb-5'>Register Property Images</h1>
            <div className='flex flex-col items-center gap-5'>

              {fields.map((field, index) => (
                <div key={field.id} className='w-full flex flex-col items-center'>
                  <input type='file' id='image' name='image' accept="image/png, image/jpg, image/jpeg" className='h-[70px] sm:w-[50%] w-[80%] border text-center text-white' {...register(`images.${index}.image`, {
                    required: "*Please provide an image"
                  })} />
                  <p className='text-red-600 sm:text-sm text-xs'>{errors.image?.message}</p>
                  {index > 2 && (<button type='button' className='text-white text-2xl font-semibold' onClick={() => remove(index)}>X</button>)}
                </div>
              ))}

              <button className='px-2.5 pb-1 bg-white rounded-full text-3xl font-smibold' onClick={() => { append({ image: '' }) }}>+</button>
              <button type='submit' className='bg-white w-[200px] rounded p-1 font-medium'>Submit</button>
            </div>
          </form>

        </div>

      </div>
    </>

  )
}

export default RegisterProperty