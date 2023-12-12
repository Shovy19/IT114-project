import React, { useState, useEffect } from 'react';
import { client } from '../lib/sanityClient';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import DropdownMenu from '../components/DropdownMenu';

import InstructorDetail from '../_leftNavigations/instructor/InstructorDetail';
import Rating from '../_leftNavigations/instructor/Rating';
import Record from '../_leftNavigations/instructor/Record'
import MoreDetail from '../_leftNavigations/instructor/MoreDetail'
import Achievement from '../_leftNavigations/instructor/Achievement'

const InstructorInfo = () => {

  const [activeContent, setActiveContent] = useState('InstructorDetail');

  const handleNavigationClick = (content) => {
    setActiveContent(content);
  };

  return (
    <>
        <div className='flex h-screen'>
        <section className='bg-green-600 w-[350px] pt-5'>
          <h1 className='text-center text-white text-3xl font-bold'>CSU Instructors</h1>

          <div className='mt-[80px]'>
            <ul className='list-none text-center mx-5'>
              <li
                className='leftNavigationLabelInstructor'
                onClick={() => handleNavigationClick('InstructorDetail')}
              >
                Instructor Detail
              </li>
              <li
                className='leftNavigationLabelInstructor'
                onClick={() => handleNavigationClick('Rating')}
              >
                Rating
              </li>
              <li
                className='leftNavigationLabelInstructor'
                onClick={() => handleNavigationClick('Records')}
              >
                Records
              </li>
              <li
                className='leftNavigationLabelInstructor'
                onClick={() => handleNavigationClick('Achievements')}
              >
                Achievements
              </li>
              <li
                className='leftNavigationLabelInstructor'
                onClick={() => handleNavigationClick('MoreDetails')}
              >
                More Details
              </li>
            </ul>
          </div>
        </section>

        <div className='absolute right-3 top-1'>
          <DropdownMenu />
        </div>

        <section className='background-image-overlay grow pr-5'>
        {activeContent === 'InstructorDetail' ? (
            <InstructorDetail />
          ) : activeContent === 'Rating' ? (
            <Rating />
          ) : activeContent === 'Records' ? (
            <Record />
          ) : activeContent === 'Achievements' ? (
            <Achievement />
          ) : activeContent === 'MoreDetails' ? (
            <MoreDetail />
          ) : (
            // Handle an unknown content type or render a default component
            <p>Unknown Content</p>
          )}
          
        </section>
      </div>
    </>
  );
};

export default InstructorInfo;
