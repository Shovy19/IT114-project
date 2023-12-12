import React, { useState, useEffect } from 'react'
import { client } from '../lib/sanityClient'
import { Link, useParams } from 'react-router-dom'

import DropdownMenu from '../components/DropdownMenu'
import LeftNavigationCollege from '../components/LeftNavigationCollege'

import "./Login.css"

// ... (imports)

const CollegeDetail = () => {
  const { collegeName } = useParams();
  const [college, setCollege] = useState(null);

  useEffect(() => {
    const fetchCollegeDetail = async () => {
      try {
        const query = `*[_type == 'college' && name == $collegeName]{
          name,
          location,
          description,
          'image': image.asset->url,
          departments[]->{
            name,
            description
          }
        }`;
        const params = { collegeName };

        const result = await client.fetch(query, params);

        if (result.length > 0) {
          setCollege(result[0]);
        } else {
          console.error('College not found');
        }
      } catch (error) {
        console.error('Error fetching college detail:', error);
      }
    };

    fetchCollegeDetail();
  }, [collegeName]);

  return (
    <>
      <div className='flex h-screen'>
        <section className='bg-green-600 w-[350px] pt-5'>
          <Link to='/Homepage'>
            <h1 className='text-center text-white text-3xl font-bold'>CSU COLLEGES</h1>
          </Link>

          <div>
            <LeftNavigationCollege />
          </div>
        </section>

        <div className='absolute right-3 top-1'>
          <DropdownMenu />
        </div>

        <section className='background-image-overlay w-4/5'>
          <div className='ml-4'>
            <Link to='/Homepage/Colleges'>
                <p className='bg-green-800 w-fit px-7 py-1 text-white rounded-sm mt-5 ml-4'>Back</p>
            </Link>
          </div>
            
          <div className='px-8 py-5'>
            {college ? (
              <>
                <div className=''>
                  <div className='flex backgroundTransparent'>
                    {college.image && <img src={college.image} alt={college.name} className='w-[500px]' />}
                    <div className='text-center pl-3 grow '>
                      <h1 className='text-center text-3xl text-slate-100 font-semibold mt-8'>{college.name}</h1>
                      <p className='w-auto text-white mt-5'>{college.description}</p>
                    </div>
                
                    
                  </div>
                  <div className='flex mt-5'>
                    <div className='ml-5 backgroundTransparent px-5 py-4 rounded-md'>
                      <h2 className='mb-2 text-white text-xl font-bold ml-2'>Departments:</h2>
                      <ul className='grid grid-cols-3 gap-2 overflow-y-auto'>
                        {college.departments.map((department, index) => (
                          <li 
                          className='text-slate-300 bg-green-800 text-center rounded-sm px-4 py-2 hover:bg-green-600 hover:text-slate-200 cursor-pointer mt-1' 
                          key={index}
                          >
                            <p className='text-white font-medium text-xl'>{department.name}</p>
                            <p className='text-slate-100'>{department.description}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
  
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default CollegeDetail;
