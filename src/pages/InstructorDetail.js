import React, { useState, useEffect } from 'react';
import { client } from '../lib/sanityClient';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import DropdownMenu from '../components/DropdownMenu';
import LeftNavigationInstructo from '../components/LeftNavigationInstructo';

const InstructorDetail = () => {
  const { instructorName } = useParams();
  const [instructor, setInstructor] = useState(null);

  useEffect(() => {
    const fetchInstructorDetail = async () => {
      try {
        const query = `*[_type == 'instructor' && name == $instructorName]{
          name,
          title,
          bio,
          age,
          birthday,
          'image': image.asset->url,
          'scheduleImage': scheduleImage.asset->url,
          courses[]->{
            title,
            code
          },
          'college': college->{
            name,
            location
          }
        }`;
        const params = { instructorName };

        const result = await client.fetch(query, params);

        if (result.length > 0) {
          setInstructor(result[0]);
          console.log(result)
        } else {
          console.error('Instructor not found');
        }
      } catch (error) {
        console.error('Error fetching instructor detail:', error);
      }
    };

    fetchInstructorDetail();
  }, [instructorName]);

  if (!instructor) {
    return <p>Loading...</p>;
  }

  return (
    <>
        <div className='flex h-screen'>
        <section className='bg-green-600 w-[350px] pt-5'>
            <h1 className='text-center text-white text-3xl font-bold'>CSU Instructors</h1>

            <div>
              <LeftNavigationInstructo />
            </div>
         
        </section>

        <div className='absolute right-3 top-1'>
          <DropdownMenu />
        </div>

        <section className='background-image-overlay grow pr-5  '>
        <div>
            <Link to='/Homepage/Instructor'>
                <p className='bg-green-800 w-fit px-7 py-1 text-white rounded-sm mt-5 ml-4'>Back</p>
            </Link>
            <div className='ml-4 mt-7'>
                <div className='flex gap-x-8 backgroundTransparent px-3 py-3'>
                    <img className='w-[240px] h-[240px] object-cover' src={instructor.image} alt={instructor.name} />
                    <div className='mt-5'>
                        <h1><span className='labelinfo'>Instructor: </span>{instructor.name}</h1>
                        <p><span className='labelinfo'>Position: </span>{instructor.title}</p>
                        <p><span className='labelinfo'>Department: </span>{instructor.college.name}</p>
                        <p className='labelinfo'>BIO:</p>
                        <p className='w-[500px] text-black px-4 py-2 rounded-sm mt-1'>{instructor.bio}</p>
                    </div>
                </div>
                <div className='flex'>
                    <div className='mt-5 ml-2 w-[400px]'>
                        <h1 className='bg-green-600 py-2 rounded-md text-center text-green-200 font-bold text-2xl mb-2'>Subjects handle</h1>
                        <div className='bg-green-700 py-4 px-3 rounded-sm'>
                            {instructor.courses.map((course, index) => (
                                <li className='bg-green-800 list-none mt-1 px-5 py-1 cursor-pointer rounded ' key={index}>
                                    <p>{course.title}</p>
                                    <p>{course.code}</p>
                                </li>
                            ))}
                        </div>
                    </div>
                    <div className='grow text-center mx-5 mt-5'>
                        <h1 className='bg-green-600 py-2 rounded-md text-center text-green-200 font-bold text-2xl mb-2'>Schedule</h1>
                        <img className='w-[440px] h-[240px] object-cover m-auto' src={instructor.scheduleImage} alt={instructor.name} />
                    </div>
                </div>
               
               
            </div>
            
        </div>
         
        </section>
      </div>
    </>
  );
};

export default InstructorDetail;
