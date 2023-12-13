import React from 'react'
import { Link } from 'react-router-dom'

const History = () => {
  return (
    <div>
        <div className='ml-4'>
          <Link to='/Homepage/Colleges'>
              <p className='bg-green-800 w-fit px-7 py-1 text-white rounded-sm mt-5 ml-4'>Back</p>
          </Link>
        </div>
        <div className='ml-4 mt-7'>
            <div className='text-3xl text-white font-bold text-center pt-[240px]'>History Page is undermaintainance</div>
        </div> 
    </div>
  )
}

export default History
