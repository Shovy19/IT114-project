import React, { useState, useEffect } from 'react'
import { client } from '../../lib/sanityClient'
import { Link, useParams } from 'react-router-dom'


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

            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    
    </>
    
  )
}

export default CollegeDetail
