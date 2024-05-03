import React, { useState } from 'react'
import updateService from '../../appwrite/upDate'





function Editpage() {
  const [change, setChange] = useState(false)


  const [fullName, setEditname] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [phoneNumber, setEditphonenumber] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setEditNewPasswordnumber] = useState('')
  const [oldPassword, setEditOldPasswordnumber] = useState('')




  function handleNameSubmit() {
    updateService.updateName(fullName)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  function handleEmailSubmit() {
    console.log('old email' + oldEmail, 'new email' + newEmail)
    updateService.updateEmail(password, String(newEmail))
      .then((response) => {
        // console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  function handlePhoneSubmit() {

    console.log('phonenumber' + phoneNumber, 'password' + password)
    updateService.updatePhone("+91" + phoneNumber, password)
      .then((response) => {
        // console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })


  }

  function handlePasswordSubmit() {

    updateService.updatePassword(newPassword, oldPassword)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })


  }
  return (
    <>
      <div className='sm:h-[100vh] flex flex-col items-center bg-gray-800'>
        <h1 className='mt-4 text-white md:text-4xl sm:text-3xl text-2xl'>Edit Details</h1>

        <div className='md:w-[700px] sm:w-[600px] w-[350px] sm:h-96 p-3 bg-white mt-5 mb-3 rounded shadow-2xl shadow-black'>

          <form className='flex flex-col sm:items-center gap-3 mt-5 text-gray-600 font-medium' onSubmit={(e) => { e.preventDefault() }}>

            {
              (!change) ?
                <div>

                  <div className='flex flex-col sm:gap-2 gap-3'>
                    <div className='flex sm:flex-row flex-col gap-2'>
                      <input type="text" id='name' placeholder='User Name' value={fullName} onChange={(e) => setEditname(e.target.value)} className='rounded-md p-1 sm:w-96 border-1 border-slate-500 ps-2' />
                      <button className='sm:w-auto w-[100px] border-2 rounded-lg px-6 py-1 bg-gray-950 text-white' onClick={() => { handleNameSubmit() }}>Submit</button>
                    </div>

                    <div className='flex sm:flex-row flex-col gap-2'>

                      <input type="email" id='newEmail' placeholder='New Email' value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className='rounded-md p-1 sm:w-96 w-88 border-1 border-slate-500 ps-2' />
                      <button className='sm:w-auto w-[100px] border-2 rounded-lg px-6 py-1 bg-gray-950 text-white' onClick={() => { handleEmailSubmit() }}>Submit</button>
                    </div>



                    <div className='flex sm:flex-row flex-col gap-2'>
                      <input type="number" id='phoneNumber' placeholder='New Phone Number' value={phoneNumber} onChange={(e) => setEditphonenumber(e.target.value)} className='rounded-md p-1 sm:w-96 w-88 border-1
                       border-slate-500 ps-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' />
                      <button className='sm:w-auto w-[100px] border-2 rounded-lg px-6 py-1 bg-gray-950 text-white' onClick={() => { handlePhoneSubmit() }}>Submit</button>
                    </div>
                    <div>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className='text-xs font-medium'>Enter Current Password to save Changes</p>
                      <input type="password" id='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-md p-1 sm:w-96 w-88 border-1 border-slate-500 ps-2' required />
                    </div>
                  </div>
                </div>
                :

                <div className='flex flex-col gap-2'>
                  <input type="text" id='newpassword' placeholder='New Password' value={newPassword} onChange={(e) => setEditNewPasswordnumber(e.target.value)} className='rounded-md p-1 sm:w-96 w-88 border-1 border-slate-500 ps-2' />
                  <input type="text" id='oldpassword' placeholder='Old Password' value={oldPassword} onChange={(e) => setEditOldPasswordnumber(e.target.value)} className='rounded-md p-1 sm:w-96 w-88 border-1 border-slate-500 ps-2' />
                  <button className='border-2 rounded-lg px-6 py-1 bg-gray-950 text-white' onClick={() => { handlePasswordSubmit() }}>Submit</button>
                </div>
            }


          </form>
          <div className='w-full flex justify-center'>
            <button className='mt-3 border-2 rounded-lg px-3 py-1 bg-gray-950 text-white transition-all' onClick={(e) => { e.preventDefault(); setChange(!change) }}>
              {(!change) ? "Change Password" : "Change Details"}</button>
          </div>
        </div>
      </div>
    </>
  )

}
export default Editpage