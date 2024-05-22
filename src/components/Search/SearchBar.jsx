import React, { useState } from 'react'
import propertyService from '../../appwrite/property.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProperties } from '../../../store/propertySlice.js'


function SearchBar() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const dispatch = useDispatch()
    function handleSearchSubmit() {

        propertyService.searchProperties(search.toUpperCase())
            .then((response) => {

                const searchedProperties = response.documents.filter((property) => {
                    const propertyName = property.city_name
                    return propertyName.toUpperCase() == search.toUpperCase()
                })
                navigate('/properties_list')
                dispatch(getProperties(searchedProperties))
                setSearch('')
            })
            .catch(err => {
                console.log(err)
            })

    }




    return (
        <>
            <div className='flex items-center justify-center'>
                <form id='form' onSubmit={(e) => { e.preventDefault(); handleSearchSubmit() }} className='flex items-center'>

                    <input type="text" id="search" placeholder="Enter city eg... New Delhi" className='h-[50px] p-1 px-3 text-white outline-none bg-transparent border-b sm:w-[200px] w-[150px] sm:placeholder:text-sm placeholder:text-xs' value={search} onChange={(e) => { setSearch(e.target.value) }} />

                    <button type='submit' className=' h-[50px] bg-[#F07045] sm:w-[120px] w-[90px] sm:text-lg text-sm text-white font-medium flex items-center justify-center'>
                        Find &nbsp;
                        <i className="fa-solid fa-arrow-right-long"></i>
                    </button>

                </form>
            </div>
        </>
    )
}

export default SearchBar