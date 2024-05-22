import React from 'react'
import '../../css/footer.css'
import { gsap } from 'gsap/dist/gsap'
import { useEffect } from 'react'


function Footer() {

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.footer-links', {
        opacity: 0,
        stagger: 0.3,
        x: 50,
        duration: 0.8,
      })
    }
    )
    return () => ctx.revert();
  }, [])

  return (
    <>
      <footer id="footer" className='h-28 flex text-white justify-center items-center border-t'>
        <h1 className='text-gray-500 font-semibold'>© Aman Chhalotre</h1>
      </footer>
    </>
  )
}

export default Footer