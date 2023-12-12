import React, { useState, useEffect } from 'react';
import { client } from '../lib/sanityClient';

const SearchInstructor = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [instructors, setInstructors] = useState([]);

  const fetchInstructors = async (query) => {
    try {
      const result = await client.fetch(query, { searchQuery });
      setInstructors(result);
    } catch (error) {
      console.error('Error fetching instructor data:', error);
    }
  };

  const handleSearch = () => {
    const query = `*[_type == 'instructor' && (name match $searchQuery)]{
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

    fetchInstructors(query);
  };

  return (
    <div>
      <div className='flex mx-7 items-center'>
        <input
        className='px-3 py-1 rounded-sm outline-none'
          type="text"
          placeholder="Search instructors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className='bg-green-800 text-white px-3 py-1' onClick={handleSearch}>Search</button>
      </div>
      <ul className='text-center mx-7 mt-2 '>
        {instructors.map((instructor, index) => (
          <li key={index}>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchInstructor;
