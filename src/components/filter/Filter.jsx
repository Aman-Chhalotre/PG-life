import React from 'react'
import descending from '../../assets/img/desc.png'
import ascending from '../../assets/img/asc.png'


function Filter({showfilter,setShowfilter}) {
  return (
    <>

    <div className={`h-1/2 rounded-r-lg absolute z-50 ${(showfilter) ? 'w-96 mobile:w-full fold-screen:w-full duration-300' : 'w-0 duration-500'}`} style={{background:"#FF5F38"}}>
        <div className={`${(showfilter) ? 'block' : 'hidden'}`}>
          <div className='flex justify-end'>
            <i className={`fa-solid fa-xmark text-white text-3xl m-2`} onClick={() => { setShowfilter(!showfilter) }}></i>
          </div>
            <div className='mt-5'>
                <div className='flex items-center m-2 text-white hover:border'>
                    <img src={ascending} className='h-8 '/>
                    <h1>Lowest rent first</h1>
                </div>
                <div className='flex items-center m-2 text-white  hover:border'>
                    <img src={descending} className='h-8'/>
                    <h1>Highest rent first</h1>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Filter