import React from 'react'
import { Link } from 'react-router-dom'
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
      <footer id="footer" className='h-28 bg-[#2e3830] flex text-white justify-center gap-10 pt-5 '>
        <h1 className='text-gray-300 font-semibold'>© Aman Chhalotre</h1>
      </footer>
    </>
  )
}

export default Footer