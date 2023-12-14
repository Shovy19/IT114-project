import React, { useState, useEffect } from 'react'
import { client } from '../../lib/sanityClient'
import { Link } from 'react-router-dom'

const Search = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
        try {
            const result = await client.fetch('*[_type == "course"]');
            setCourses(result);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        const search = () => {
        if (!searchTerm) {
            setSearchResults([]);
            return;
        }

        const filteredCourses = courses.filter((course) =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(filteredCourses);
        };

        search();
    }, [searchTerm, courses]);
  return (
    <div className='bg-green-700 mt-6 pb-4 px-5'>
      <h1 className='text-center text-white font-bold text-2xl py-3'>Search a Subjects</h1>
      <div className='text-center'>
        <input
            type="text"
            className='w-[400px] py-1 px-3 rounded-sm text'
            placeholder="Search courses/Subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className='mt-5'>
        {searchResults.length > 0 ? (
          searchResults.map((course) => (
            <div className='px-3 py-1 mb-1 bg-green-900 rounded-md hover:bg-green-800 text-white rounded-sm' key={course._id}>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              {/* Render other course details as needed */}
            </div>
          ))
        ) : (
          <p className='text-center text-white'>No matching courses found.</p>
        )}
      </ul>
    </div>
  )
}

export default Search
