import React, { useEffect, useState } from 'react'
import './../css/dashboard.css'
import { Link  } from 'react-router-dom'
// import { datas } from '../data/data'
import useDetail from '../context/details'
import { useSelector } from 'react-redux'


function Dashboard() {
  const { setId } = useDetail()

  const data = useSelector((state)=> state.authReducer.userData)
  // console.log(data)

  

  return (
    <>
      <div id='main' className='mt-20 h-auto flex flex-col items-center mobile:items-start mobile:ms-2 fold-screen:items-start fold-screen:ms-2'>

        <div id='info' className='h-60 mb-32 '>

          <div>
            <h1 className='text-4xl font-medium text-gray-700 mobile:text-xl fold-screen:text-xl'>My Profile</h1>
          </div>

          <div className='flex'>
            <div className='mt-10'>
              <i className="fa-solid fa-user text-slate-500 text-8xl mobile:text-5xl fold-screen:text-3xl"></i>
            </div>

            <div className='ps-10 w-full mt-10'>
              <h1 className='text-xl font-bold text-gray-700 mobile:text-sm fold-screen:text-sm'>{data?.name.toUpperCase()}</h1>
              <h1 className='text-gray-600 mobile:text-xs fold-screen:text-xs'><i className="fa-regular fa-envelope mobile:text-xs fold-screen:text-xs"></i> {data?.email}</h1>
              <h1 className='text-gray-600 mobile:text-xs fold-screen:text-xs'><i className="fa-solid fa-phone mobile:text-xs fold-screen:text-xs"></i> {data?.phone}</h1>
              <div className='flex justify-between items-end'>
                
                <Link to='/Editpage' className='text-gray-600 text-xs underline'>Edit Profile</Link>
              </div>
            </div>
          </div>

        </div>

        {/* {arr?.map((data) => 
          
            <div id='interests' className='w-1/2 mb-4 ' key={data.id}>

              <div className='h-60  border-2 p-3 rounded flex'>

                <div className=''>
                  <img src={data.thumbnail} alt="" className='h-40 w-80 rounded' />
                </div>

                <div className='ms-3 w-full'>

                  <div className='flex justify-between'>
                    <div>
                      <i class="fa-regular fa-star text-red-600"></i>
                      <i class="fa-regular fa-star text-red-600"></i>
                      <i class="fa-regular fa-star text-red-600"></i>
                      <i class="fa-regular fa-star text-red-600"></i>
                      <i class="fa-regular fa-star text-red-600"></i>

                      {/* <i class="fa-solid fa-star text-red-600"></i>
                    <i class="fa-solid fa-star text-red-600"></i>
                    <i class="fa-solid fa-star text-red-600"></i>
                    <i class="fa-solid fa-star text-red-600"></i>
                    <i class="fa-solid fa-star text-red-600"></i> */}
                    {/* </div> */}

                    {/* <div>
                    
                      <button onClick={() => {setTemp(!temp)}}>
                    
                        {(data.interested) ? <i className="fa-solid fa-heart text-red-600"></i> : <i className="fa-regular fa-heart text-red-600"></i>}
                    
                      </button>

                    </div> */}

                  {/* </div> */}

                  {/* // <div className='mt-2'>
                  //   <h1 className='font-medium text-lg text-gray-700'>{data.name}</h1>
                  //   <h1 className='pt-1 text-xs text font-medium text-slate-500'>{data.address}</h1>
                  //   <img src={data.gender} alt="" className='h-10 mt-2' />
                  // </div> */}

                  {/* // <div className='mt-5 flex justify-between'>
                  //   <div className='flex items-center'>
                  //     <h1 className='font-medium text-gray-700'>₹ {data.rent}</h1>
                  //     &nbsp;
                  //     <h1 className='text-xs text-gray-600'>per month</h1>
                  //   </div>
                  //   <div>
                  //   <Link to='/Property_Detail' onClick={() => { setId(data.id) }} className='bg-cyan-600 w-28 p-1 px-5 rounded text-white font-medium hover:bg-cyan-700'>View</Link>
                  //   </div>
                  // </div> */}

            {/* //     </div> */}

            {/* //   </div> */}
            {/* // </div> */}
          
        {/* // )} */} 
      </div>

    </>
  )
}

export default Dashboard