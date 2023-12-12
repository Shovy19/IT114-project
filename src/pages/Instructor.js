import React, { useState, useEffect } from 'react'
import { client } from '../lib/sanityClient'
import { Link } from 'react-router-dom'

import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'
import SearchInstructor from '../components/SearchInstructor'

import "./Login.css"

const Instructor = () => {

  // State to store the fetched colleges and instructors
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to fetch college data
  const fetchColleges = async () => {
    try {
      const collegesQuery = `*[_type == 'college']{
        _id,
        name
      }`;
      const collegesResult = await client.fetch(collegesQuery);
      setColleges(collegesResult);
    } catch (error) {
      console.error('Error fetching college data:', error);
    }
  };

  // Function to fetch instructor data based on the selected college
  const fetchInstructors = async () => {
    try {
      // Construct the query with a condition to check if the college is selected
      const instructorsQuery = `*[_type == 'instructor'${selectedCollege ? ' && college._ref == $collegeId' : ''}]{
        name,
        title,
        bio,
        age,
        birthday,
        'image': image.asset->url,
        courses[]->{
          title,
          code
        },
        'college': college->{
          name,
          location
        }
      }`;

      // Use the client to fetch data
      const instructorsResult = await client.fetch(instructorsQuery, { collegeId: selectedCollege?._id });
      setInstructors(instructorsResult);
    } catch (error) {
      console.error('Error fetching instructor data:', error);
    }
  };

  // useEffect to fetch college data when the component mounts
  useEffect(() => {
    fetchColleges();
  }, []);

  // useEffect to fetch instructors when the selected college changes
  useEffect(() => {
    if (selectedCollege) {
      fetchInstructors();
    }
  }, [selectedCollege]);
  

  return (
    <>
      <div className='flex h-screen'>
        <section className='bg-green-600 w-[350px] pt-5'>
          <Link to='/Homepage'>
            <h1 className='text-center text-white text-3xl font-bold'>CSU Instructors</h1>

          </Link>
         
          <h1 className='text-center mt-20 mb-5 text-xl font-semibold text-slate-100'>Colleges Instructors</h1>
          <div className='grid justify-center'>

            {colleges.map((college, index) => (
            <button 
              className='bg-green-800 w-[300px] text-white mt-2 px-3 py-2 rounded-sm hover:bg-slate-500' 
              key={index} 
              onClick={() => setSelectedCollege(college)}
            >
              {college.name}
            </button>
            ))}

          </div>
         
        </section>

        <div className='absolute right-3 top-1'>
          <DropdownMenu />
        </div>

        <section className='background-image-overlay grow'>
          <div>
            <div className='w-[400px] h-[130px] mt-6'>
              <SearchInstructor />
            </div>
            <div className='bg-green-800 rounded-sm mt-[30px] mx-5 px-5 py-4'>
              <h1 className='text-xl text-white'>Instructors</h1>
              {/* List of instructors for the selected college */}
              <div>
                <ul className='grid lg:grid-cols-2 lg:gap-1 grid-cols-1 '>
                  {instructors.map((instructor, index) => (
                    <Link key={index} to={`/instructor/${instructor.name}`}>
                      <div 
                      className='mt-1 bg-green-700 flex px-4 py-2 hover:bg-green-900 rounded-sm items-center'
                      >
                        <img className='w-20 h-20 object-cover rounded-sm' src={instructor.image} />
                        <div className='ml-4'>
                          <h2 className='text-white font-semibold'>{instructor.name}</h2>
                          <p className='text-[12px] text-slate-800 font-medium'>{instructor.title}</p>
                          <p className='text-[10px] text-slate-300'>{instructor.college.name}</p>
                        </div>
                    
                      </div>
                    </Link>
                  ))}
                </ul>      
              </div>
      
            </div>
          </div>
         
        </section>
      </div>
    </>
  )
}

export default Instructor
