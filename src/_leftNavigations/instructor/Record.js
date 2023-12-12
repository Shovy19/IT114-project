import React from 'react'
import { Link } from 'react-router-dom'

const Record = () => {
  return (
    <div>
        <Link to='/Homepage/Instructor'>
            <p className='bg-green-800 w-fit px-7 py-1 text-white rounded-sm mt-5 ml-4'>Back</p>
        </Link>
        <div className='ml-4 mt-7'>
            <div className='text-3xl text-white font-bold text-center pt-[240px]'>Records Page is undermaintainance</div>
        </div> 
    </div>
  )
}

export default Record
