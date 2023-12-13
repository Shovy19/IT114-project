import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import DropdownMenu from '../components/DropdownMenu'
import LeftNavigationCollege from '../components/LeftNavigationCollege'

import "./Login.css"

import CollegeDetail from '../_leftNavigations/college/CollegeDetail'
import Achivement from '../_leftNavigations/college/Achievement'
import History from '../_leftNavigations/college/History'
import Department from '../_leftNavigations/college/Department'
import MoreDetail from '../_leftNavigations/college/MoreDetail'
import Student from '../_leftNavigations/college/Student'

const CollegeInfo = () => {
  const [activeContent, setActiveContent] = useState('InstructorDetail');

  const handleNavigationClick = (content) => {
    setActiveContent(content);
  };

  return (
    <>
      <div className='flex h-screen'>
        <section className='bg-green-600 w-[350px] pt-5'>
          <Link to='/Homepage'>
            <h1 className='text-center text-white text-3xl font-bold'>CSU COLLEGES</h1>
          </Link>

          <div className='mt-[80px]'>
            <ul className='list-none text-center mx-5'>
              <li
                className='leftNavigationLabelInstructor'
                onClick={() => handleNavigationClick('CollegeDetail')}
              >
                CollegeDetail
              </li>
              <li
                className='leftNavigationLabelInstructor'
                onClick={() => handleNavigationClick('History')}
              >
                History
              </li>
              <li
                className='leftNavigationLabelInstructor'
                onClick={() => handleNavigationClick('Department')}
              >
                Department
              </li>
              <li
                className='leftNavigationLabelInstructor'
                onClick={() => handleNavigationClick('Achievement')}
              >
                Achievement
              </li>
              <li
                className='leftNavigationLabelInstructor'
                onClick={() => handleNavigationClick('Student')}
              >
                Student
              </li>
              <li
                className='leftNavigationLabelInstructor'
                onClick={() => handleNavigationClick('MoreDetail')}
              >
                More Detail
              </li>
            </ul>
          </div>
        </section>

        <div className='absolute right-3 top-1'>
          <DropdownMenu />
        </div>

        <section className='background-image-overlay w-4/5 overflow-auto'>
          
          {activeContent === 'CollegeDetail' ? (
            <CollegeDetail />
          ) : activeContent === 'History' ? (
            <History />
          ) : activeContent === 'Department' ? (
            <Department />
          ) : activeContent === 'Achievement' ? (
            <Achivement />
          ) : activeContent === 'Student' ? (
            <Student />
          ) :  activeContent === 'MoreDetail' ? (
            <MoreDetail />
          ) : (
            // Handle an unknown content type or render a default component
            <CollegeDetail />
          )}
            
          
        </section>
      </div>
    </>
  );
};

export default CollegeInfo;
