import React, { useState, useEffect } from 'react'
import { client } from '../lib/sanityClient'
import { Link } from 'react-router-dom'

import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'

import "./Login.css"

const Colleges = () => {

  // State to store the fetched data
  const [colleges, setColleges] = useState([]);

  // Function to fetch data from Sanity
  const fetchColleges = async () => {
    try {
      // Query to fetch college data with image and departments
      const query = `*[_type == 'college']{
        name,
        location,
        description,
        'image': image.asset->url, // Retrieve the image URL from the asset
        departments[]->{
          name,
          description
        }
      }`;
      

      // Use the client to fetch data
      const result = await client.fetch(query);

      // Set the fetched data to state
      setColleges(result);
      console.log(result)
    } catch (error) {
      console.error('Error fetching college data:', error);
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchColleges();
  }, []); 

  return (
    <>
      <div className='flex h-screen'>
        <section className='bg-green-600 w-[350px] pt-5'>
          <Link to='/Homepage'>
            <h1 className='text-center text-white text-3xl font-bold'>CSU COLLEGES</h1>
          </Link>
         
        </section>

        <div className='absolute right-3 top-1'>
          <DropdownMenu />
        </div>

        <section className='background-image-overlay grow overflow-auto'>
          <div className='pt-20 grid xl:grid-cols-2'>
            {colleges.map((college, index) => (
              <Link to={`/colleges/${college.name}`} key={index}>
                 <div className='bg-green-700 w-4/5 m-auto flex mb-3 px-4 py-2 rounded-md hover:bg-slate-400 items-center'>
                    <img className='rounded-lg w-[200px] h-[100px] object-cover' src={college.image} />

                    <div className='w-full text-center'>
                      <h2 className='text-center mb-3 text-xl font-semibold text-white'>{college.name}</h2>
                    </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default Colleges
