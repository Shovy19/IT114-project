import DropdownMenu from '../../components/DropdownMenu';
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { client } from '../../lib/sanityClient';

import '../../pages/Login.css'


const SubjectInfo = () => {
    const [activeContent, setActiveContent] = useState('InstructorDetail');
    const { courseId } = useParams(); // Use useParams to get the courseId from the URL
    const [courseDetails, setCourseDetails] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                // Fetch details for the specific course using the courseId
                const result = await client.fetch(`
                    *[_type == "course" && _id == $courseId][0]{
                        title,
                        code,
                        description,
                        department->{
                            name
                        },
                        instructors[]->{
                            _id,
                            name,
                            title,
                            bio,
                            age,
                            birthday,
                            'image': image.asset->url
                        }
                    }
                `, {
                    courseId: courseId,
                });

                // Set the courseDetails state with the fetched data
                setCourseDetails(result);
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        // Call the fetchCourseDetails function
        fetchCourseDetails();
    }, [courseId]);
    
  return (
    <div className='flex h-screen'>
    <section className='bg-green-600 w-[350px] pt-5 overflow-y-auto pb-5'>
      <Link to='/Homepage'>
        <h1 className='text-center text-white text-3xl font-bold'>CSU SUBJECTS</h1>
      </Link>

      <div className='mt-[80px]'>
        <ul className='list-none text-center mx-5'>
          <li
            className='leftNavigationLabelInstructor'
            onClick={() => setActiveContent('AllSubject')}
          >
            All Subjects
          </li>
          <li
            className='leftNavigationLabelInstructor'
            onClick={() => setActiveContent('MajorSubject')}
          >
            Major Subjects
          </li>
          <li
            className='leftNavigationLabelInstructor'
            onClick={() => setActiveContent('MinorSubject')}
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
      <Link to='/Homepage/Subjects'>
        <p className='bg-green-800 w-fit px-7 py-1 text-white rounded-sm mt-5 ml-4'>Back</p>
      </Link>

      <div className='backgroundTransparent mx-5 mt-7 text-white rounded-sm'>
        {courseDetails ? (
                            <div className='px-5 py-3'>
                                <h2>Subject: {courseDetails.title}</h2>
                                <p>Code: {courseDetails.code}</p>
                                <p>Description: {courseDetails.description}</p>
                                {courseDetails.department && (
                                    <p>Department: {courseDetails.department.name}</p>
                                )}
                                <div className='bg-green-600 px-3 py-2 rounded-sm mt-7'>
                                    {courseDetails.instructors && courseDetails.instructors.length > 0 && (
                                        <div>
                                            <h3 className='font-semibold'>Instructors Handling this Subject:</h3>
                                            {courseDetails.instructors.map((instructor) => (
                                                <div className='bg-green-900 px-3 py-1 rounded-sm flex' key={instructor._id}>
                                                    <div>
                                                        <img src={instructor.image} className='w-[50px]' />
                                                    </div>
                                                    <div className='ml-4'>
                                                        <h4>Instructor: {instructor.name}</h4>
                                                        <p>Title: {instructor.title}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            
                            </div>
                        ) : (
                            <p>Loading course details...</p>
                        )}
        </div>
    </section>
  </div>
  )
}

export default SubjectInfo
