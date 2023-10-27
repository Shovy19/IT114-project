import React from 'react'
import { Link } from 'react-router-dom';

import DateTimeDisplay from '../components/DateTimeDisplay'

import background from "../images/Background.jpg"


const Welcome = () => {
  return (
    <>
    <section className='relative'>
        <div>
            <img src={background}
                className='w-full h-screen object-cover'
            />    
        </div>

         {/* this is the top */}
        <div className='absolute top-0 right-0 left-0 bg-green-500 p-4'>
            <div className='md:flex justify-center'>
                <div className='flex justify-center items-center '>
                    <h1 className='text-md md:text-xl text-slate-100 font-medium'>Welcome to CARAGA STATE UNIVERSITY - MAIN CAMPUS</h1>
                </div>
                <div className='mx-12 text-sm text-slate-100'>
                    <DateTimeDisplay />
                </div>
            </div>
        </div>

        {/* center not absolute */}
        <div className='absolute top-0 bottom-0 right-0 left-0'>
            <div className='flex items-center justify-end h-screen'>
                <div className='mr-10 p-20 bg-green-500 opacity-80 text-center rounded-lg'>
                    <h2 className='capitalize text-white'>University <br /> Information <br /> kiosk</h2>
                </div>
            </div>
        </div>



        {/* this is the bottom */}
        <Link to="/Login">
            <div className='absolute bottom-0 left-0 right-0 bg-green-500 py-4 text-center hover:bg-green-600'>
                <h1 className='text-xl font-bold text-slate-200'>Click to Begin</h1>
            </div>
        </Link>

    </section>

    </>
  )
}

export default Welcome
