import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'

import AllSubject from '../_leftNavigations/subjects/AllSubject'
import MajorSubject from '../_leftNavigations/subjects/MajorSubject'
import MinorSubject from '../_leftNavigations/subjects/MinorSubject'
import Search from '../_leftNavigations/subjects/Search'


import "./Login.css"

const Subjects = () => {

  const [activeContent, setActiveContent] = useState('InstructorDetail');

  const handleNavigationClick = (content) => {
    setActiveContent(content);
  };

  

  return (
    <>
      <div className='flex h-screen'>
        <section className='bg-green-600 w-[350px] pt-5 overflow-y-auto pb-5'>
          <Link to='/Homepage'>
            <h1 className='text-center text-white text-3xl font-bold'>CSU SUBJECTS</h1>

          </Link>

          <div className='mt-[80px]'>
            <ul className='list-none text-center mx-5'>
              <li
                className='leftNavigationLabelInstructor'
                onClick={() => handleNavigationClick('AllSubject')}
              >
                All Subjects
              </li>
              <li
                className='leftNavigationLabelInstructor'
                onClick={() => handleNavigationClick('MajorSubject')}
              >
                Major Subjects
              </li>
              <li
                className='leftNavigationLabelInstructor'
                onClick={() => handleNavigationClick('MinorSubject')}
              >
                Minor Subjects
              </li>
             
            </ul>
          </div>
         
         
        </section>

        <div className='absolute right-3 top-1'>
          <DropdownMenu />
        </div>

        <section className='background-image-overlay grow pr-5 overflow-auto pb-4'>

        <div className='grid grid-cols-2 mt-16 gap-2 mx-5'>
          <div>
            {activeContent === 'AllSubject' ? (
                <AllSubject />
              ) : activeContent === 'MajorSubject' ? (
                <MajorSubject />
              ) : activeContent === 'MinorSubject' ? (
                <MinorSubject />
              ) : (
                // Handle an unknown content type or render a default component
                <AllSubject />
              )}
          </div>
          <div>
            <Search />
          </div>
        </div>
        
          
        </section>

      </div>
    </>
  )
}

export default Subjects;
