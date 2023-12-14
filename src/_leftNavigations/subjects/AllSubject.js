import React, { useState, useEffect } from 'react'
import { client } from '../../lib/sanityClient'
import { Link } from 'react-router-dom'



import "../../pages/Login.css"

const AllSubject = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
        try {
            // Fetch all documents of type 'course'
            const result = await client.fetch('*[_type == "course"]');

            // Set the courses state with the fetched data
            setCourses(result);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
        };

    // Call the fetchCourses function
    fetchCourses();
  }, []); 
  return (
    <div>
      <h1 className='ml-5 text-3xl text-slate-700 shadow-sm font-extrabold'>All Courses</h1>
      <div className='grid grid-cols-2 gap-2 backgroundTransparent px-3 pt-2 pb-2 '>
        {courses.map((course) => (
          <Link to={`/subject/${course._id}`} key={course._id} className='bg-green-700 px-2 py-2 rounded-sm cursor-pointer text-white'>
            <h2>{course.title}</h2>
            {/* Render other course details as needed */}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AllSubject
