import React, { useEffect, useState } from 'react'
import '../css/property_detail.css'
import { Link, json } from 'react-router-dom'
import { gsap } from 'gsap/dist/gsap'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import propertyService from '../appwrite/property.js'
import { getPropertiesImages } from '../../store/propertySlice.js'
import 'swiper/css';
import male from '../assets/img/male.png'
import female from '../assets/img/female.png'
import unisex from '../assets/img/unisex.png'
import testimonialService from '../appwrite/testimonials.js'
import { useForm } from 'react-hook-form'


SwiperCore.use([Navigation]);

function Property_Detail() {
    const [detail, setDetail] = useState(null)
    const [showTextfield, setShowTextfield] = useState(false)
    const [testimonials, setTestimonials] = useState([])

    const form = useForm()
    const { register, handleSubmit, reset, formState } = form
    const { errors } = formState

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('#aboutProperty,#amenities', {
                opacity: 0,
                duration: 2
            }), gsap.from('#box,#feedback', {
                opacity: 0,
                x: -100,
                duration: 1.5
            }), gsap.from('#testimonials', {
                opacity: 0,
                y: -100,
                duration: 1.5,
                stagger: 0.2
            }), gsap.from('#ratings', {
                opacity: 0,
                duration: 1,
                stagger: 1
            })
        }
        )
        return () => ctx.revert();
    }, [])

    const dispatch = useDispatch()

    const properties = useSelector((state) => state.propertyReducer.properties)
    const propertyId = useSelector((state) => state.propertyReducer.propertyId)
    const propertiesImages = useSelector((state) => state.propertyReducer.propertiesImages)
    const userData = useSelector((state) => state.authReducer.userData)


    function onhandleTestimonialsubmit(data) {

        testimonialService.storeTestimonial(propertyId, userData.name, data.testimonial)
            .then((response) => {
                // console.log(response)

            })

        setShowTextfield(!showTextfield)
        reset()
    }



    useEffect(() => {
        properties?.map((property) => {
            if (property.$id == propertyId) {
                setDetail(property)
            }
        })
        propertyService.getPropertiesImages()
            .then((response) => {
                let images = response.documents.filter((value) => (value.properties_id == propertyId))

                dispatch(getPropertiesImages({ images }))
            })
        testimonialService.getTestimonials()
            .then((res) => {
                const list = res.documents
                const testimonialArray = list.filter((test) => test.property_id == propertyId)
                setTestimonials(testimonialArray)
            })
    }, [])



    return (
        <>

            <div className='h-full w-full ' key={detail?.id}>

                <Swiper

                    slidesPerView={1}
                    spaceBetween={2}
                    navigation={true}
                    className="mySwiper"
                >
                    <div className='flex'>
                        {propertiesImages?.map((value) =>
                            <SwiperSlide key={value.$id}>
                                <img src={value.image_url} className="md:h-[90vh] h-[70vh] w-full object-contain" />
                            </SwiperSlide>
                        )}
                    </div>

                </Swiper>




                <div className='w-full h-96 '>
                    <div id='box' className=' border lg:px-[180px] md:px-[100px] px-[30px] py-3 rounded flex '>

                        <div className='ms-3 w-full'>

                            <div className='flex justify-between'>
                                <div className='text-lg mobile:text-sm fold-screen:text-sm'>
                                    <i className="fa-regular fa-star text-red-600"></i>
                                    <i className="fa-regular fa-star text-red-600"></i>
                                    <i className="fa-regular fa-star text-red-600"></i>
                                    <i className="fa-regular fa-star text-red-600"></i>
                                    <i className="fa-regular fa-star text-red-600"></i>

                                    {/* <i className="fa-solid fa-star text-red-600"></i>
                                        <i className="fa-solid fa-star text-red-600"></i>
                                        <i className="fa-solid fa-star text-red-600"></i>
                                        <i className="fa-solid fa-star text-red-600"></i>
                                        <i className="fa-solid fa-star text-red-600"></i> */}
                                </div>

                                <div className='text-lg mobile:text-sm fold-screen:text-sm'>
                                    <i className="fa-regular fa-heart text-red-600"></i>

                                    {/* <i className="fa-solid fa-heart text-red-600"></i> */}
                                </div>

                            </div>

                            <div className='mt-2'>
                                <h1 className='font-medium text-2xl text-gray-700 mobile:text-lg fold-screen:text-lg'>{detail?.name}</h1>
                                <h1 className='pt-1 text-xs font-medium text-slate-500'>{detail?.address}</h1>

                                {
                                    (detail?.gender == 'male') ? <img src={male} alt="" className='h-14 mt-2 mobile:h-10 fold-screen:h-14' /> :
                                        (detail?.gender == 'female') ? <img src={female} alt="" className='h-14 mt-2 mobile:h-10 fold-screen:h-14' /> :
                                            (detail?.gender == 'unisex') ? <img src={unisex} alt="" className='h-14 mt-2 mobile:h-10 fold-screen:h-14' /> : null

                                }

                            </div>

                            <div className='my-10 flex justify-between mobile:flex-col  mobile:gap-2 mobile:items-end fold-screen:flex-col fold-screen:items-end'>

                                <div className='flex items-center'>
                                    <h1 className='font-medium text-gray-700 sm:text-xl text-lg'>₹ {detail?.rent}</h1>
                                    &nbsp;
                                    <h1 className='text-xs text-gray-600'>per month</h1>
                                </div>

                                <div>
                                    <Link to='/' onClick={() => { setId(id) }} className='bg-cyan-600 px-4 p-1 rounded text-white font-medium hover:bg-cyan-700'>Book Now</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div id='amenities' className='sm:h-96 mt-16 flex flex-col items-center gap-5 '>
                    <div>
                        <h1 className='sm:text-4xl font-semibold text-gray-700 text-2xl'>Amenities</h1>
                    </div>
                    <div className='flex justify-center gap-5 sm:flex-row flex-col '>
                        <div className='flex gap-3'>
                            <div >
                                <h1 className='text-lg font-semibold text-gray-600 '>Building</h1>
                                <div className='mt-2'>
                                    {
                                        // detail.amenities.building.map((amenity) =>
                                        //     <img src={amenity} alt="" className='mb-2 text-gray-600' key={detail?.id} />
                                        // )
                                    }
                                </div>
                            </div>
                            <div>
                                <h1 className='text-lg font-semibold text-gray-600 '>Common Area</h1>
                                <div className='mt-2'>
                                    {
                                        // detail.amenities.commonArea.map((amenity) =>
                                        //     <img src={amenity} alt="" className='mb-2' />
                                        // )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-3'>
                            <div>
                                <h1 className='text-lg font-semibold text-gray-600 '>Bedroom</h1>
                                <div className='mt-2'>
                                    {
                                        // detail.amenities.bedroom.map((amenity) =>
                                        //     <img src={amenity} alt="" className='mb-2' />
                                        // )
                                    }
                                </div>
                            </div>
                            <div>
                                <h1 className='text-lg font-semibold text-gray-600 '>Washroom</h1>
                                <div className='mt-2'>
                                    {
                                        // detail.amenities.washroom.map((amenity) =>
                                        //     <img src={amenity} alt="" className='mb-2' />
                                        // )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='aboutProperty' className='sm:h-96 mt-16 flex flex-col items-center h-auto'>
                    <div>
                        <h1 className='sm:text-4xl font-semibold text-gray-700 text-2xl'>About the Property</h1>
                    </div>
                    <div className='sm:w-2/3 w-3/4 mt-5 bg-gray-300 p-2 rounded-xl'>
                        <h1 className='text-gray-800 sm:text-lg text-sm font-medium'>{detail?.description}</h1>
                    </div>
                </div>

                <div id='ratings' className='sm:h-96 mt-16 flex flex-col items-center :h-auto'>
                    <div>
                        <h1 className='sm:text-4xl font-semibold text-gray-700 text-2xl'>Property Rating</h1>
                    </div>
                    <div className='h-52 sm:w-2/3 sm:px-0 flex justify-evenly items-center w-full px-2'>
                        <div className='flex flex-col gap-3'>
                            <div className='flex sm:gap-2 items-center gap-1'>
                                <i className="fa-solid fa-broom"></i>
                                <h1 className='sm:text-lg text-sm'>Cleanliness</h1>
                                <div className='ms-4 sm:text-lg text-sm'>
                                    <i className="fa-regular fa-star text-cyan-500"></i>
                                    <i className="fa-regular fa-star text-cyan-500"></i>
                                    <i className="fa-regular fa-star text-cyan-500"></i>
                                    <i className="fa-regular fa-star text-cyan-500"></i>
                                    <i className="fa-regular fa-star text-cyan-500"></i>
                                </div>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <i class="fa-solid fa-utensils"></i>
                                <h1 className='ms-1 sm:text-lg text-sm'>Food Quality</h1>
                                <div className='ms-3 sm:text-lg text-sm'>
                                    <i className="fa-regular fa-star text-cyan-500"></i>
                                    <i className="fa-regular fa-star text-cyan-500"></i>
                                    <i className="fa-regular fa-star text-cyan-500"></i>
                                    <i className="fa-regular fa-star text-cyan-500"></i>
                                    <i className="fa-regular fa-star text-cyan-500"></i>
                                </div>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <i class="fa-solid fa-lock"></i>
                                <h1 className='ms-1 sm:text-lg text-sm'>Sefety</h1>
                                <div className='ms-14 sm:text-lg text-sm'>
                                    <i className="fa-regular fa-star text-cyan-500"></i>
                                    <i className="fa-regular fa-star text-cyan-500"></i>
                                    <i className="fa-regular fa-star text-cyan-500"></i>
                                    <i className="fa-regular fa-star text-cyan-500"></i>
                                    <i className="fa-regular fa-star text-cyan-500"></i>
                                </div>
                            </div>

                        </div>
                        <div>
                            <div className='sm:h-36 sm:w-36 rounded-full text-center border bg-cyan-500 flex flex-col justify-center items-center h-20 w-20'>
                                <h1 className='text-white sm:text-4xl text-xl'>3.4</h1>
                                <div className='sm:text-lg text-xs'>
                                    <i className="fa-regular fa-star text-white"></i>
                                    <i className="fa-regular fa-star text-white"></i>
                                    <i className="fa-regular fa-star text-white"></i>
                                    <i className="fa-regular fa-star text-white"></i>
                                    <i className="fa-regular fa-star text-white"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='h-auto mt-16 flex sm:gap-[60px] flex-col items-center mb-52 gap-14'>
                    <div>
                        <h1 className='sm:text-4xl font-semibold text-gray-800 text-2xl'>What people say</h1>
                    </div>


                    <div className='sm:h-96 sm:w-2/3 w-3/4 mt-5 grid sm:grid-cols-2 sm:items-end sm:gap-3 gap-5 items-center h-auto' >
                        {testimonials.map((testimonial, index) =>
                            <div id='testimonials' className='sm:min-h-32 h-auto bg-black pb-3 rounded-lg flex flex-col items-center w-auto' key={index} >
                                <h1 className='font-medium text-gray-500 px-3 py-3'><i className="fa-solid fa-quote-left text-gray-700"></i>{testimonial.content}.</h1>
                                <h1 className='font-bold text-gray-700 mt-2'>- {testimonial.user_name}</h1>

                            </div>
                        )}
                    </div>
                    {(showTextfield) ?
                        <div className='h-full w-full flex flex-col items-center gap-3'>
                            <form onSubmit={handleSubmit(onhandleTestimonialsubmit)} className='w-full flex flex-col items-center gap-3'>
                                <textarea name="testimonial" placeholder='Please type your Feedback' className='h-[200px] w-[50%] p-2 border-2 rounded-lg border-gray-300 outline-none bg-gray-100' {...register('testimonial', {
                                    required: 'Please give Feedback'
                                })} />
                                <p className='text-red-600 sm:text-sm text-xs'>{errors.testimonial?.message}</p>
                                <button type='submit' className='bg-[#2d545e] shadow-md shadow-[#12343b] w-[100px] py-1 text-white font-semibold rounded' >Send</button>
                            </form>
                        </div>
                        : null}

                    <button id='feedback' className={`${(showTextfield) ? 'hidden' : 'block'} py-1 px-2 rounded-lg font-semibold bg-[#feda5a]`} onClick={() => { setShowTextfield(!showTextfield) }}>Give Feedback</button>
                </div>
            </div>
        </>
    )
}

export default Property_Detail