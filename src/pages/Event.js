import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import DropdownMenu from '../components/DropdownMenu';

import DateTimeDisplayFlex from '../components/DateTimeDisplayFlex'
import LeftNavigationEvent from '../components/LeftNavigationEvent';

import All from '../_leftNavigations/_event/All';
import Latest from '../_leftNavigations/_event/Latest';
import Past from '../_leftNavigations/_event/Past';
import MoreDetail from '../_leftNavigations/_event/MoreDetail';


import "./Login.css"

const Event = () => {

  const [activeContent, setActiveContent] = useState('InstructorDetail');

  const handleNavigationClick = (content) => {
    setActiveContent(content);
  };


  return (
    <>
      <div className='flex h-screen'>
        <section className='bg-green-600 w-1/5 pt-5'>
          <Link to='/Homepage'>
            <h1 className='text-center text-white text-3xl font-bold'>CSU Events</h1>

          </Link>
          <div className='mt-[80px]'>
            <ul className='list-none text-center mx-5'>
              <li
                className='leftNavigationLabelInstructor'
                onClick={() => handleNavigationClick('All')}
              >
                All Event
              </li>
              <li
                className='leftNavigationLabelInstructor'
                onClick={() => handleNavigationClick('Latest')}
              >
                Latest Event
              </li>
              <li
                className='leftNavigationLabelInstructor'
                onClick={() => handleNavigationClick('Past')}
              >
                Past Event
              </li>
              <li
                className='leftNavigationLabelInstructor'
                onClick={() => handleNavigationClick('MoreDetail')}
              >
                More Details
              </li>
            </ul>
          </div>
         
          
        </section>

        <div className='absolute right-7 top-1'>
          <DropdownMenu />
        </div>

        <section className='background-image-overlay w-4/5 overflow-auto pb-5'>
        {activeContent === 'All' ? (
            <All />
          ) : activeContent === 'Latest' ? (
            <Latest />
          ) : activeContent === 'Past' ? (
            <Past />
          ) : activeContent === 'MoreDetail' ? (
            <MoreDetail />
          ) : (
            <All />
          )}
         
        </section>
      </div>
    </>
  )
}

export default Event
