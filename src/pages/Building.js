import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { client } from '../lib/sanityClient'
import sanityClient from '@sanity/client';

import DateTimeDisplayFlex from '../components/DateTimeDisplayFlex'
import "./Login.css"
import DropdownMenu from '../components/DropdownMenu'
import background from "../images/Background.jpg"
import LeftNavigationBuilding from '../components/LeftNavigationBuilding';


const Building = () => {

  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const query = `*[_type == 'building']{
          _id,
          name,
          location,
          description,
          'imageUrl': image.asset->url
        }`;

        const data = await client.fetch(query);
        setBuildings(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBuildings();
  }, []);

  return (
    
    <>
      <div className='flex h-screen'>
        <section className='bg-green-600 w-[350px] pt-5'>
          <Link to='/Homepage'>
            <h1 className='text-center text-white text-3xl font-bold'>CSU Buildings</h1>
          </Link>

          <div>
            <LeftNavigationBuilding />
          </div>
         
        </section>

        <div className='absolute right-5 top-1'>
          <DropdownMenu />
        </div>

        <section className='background-image-overlay grow px-5 overflow-y-auto'>
          <div className='mt-[80px] pb-3 px-3 py-3 rounded-sm'>
            <ul className='grid md:grid-cols-2 gap-2 border-1px-4 '>
              {buildings.map((building) => (
                <li 
                className=' py-2 border-0 bg-green-700 rounded-lg text-center'
                key={building._id}>
                  <Link to={`/Building/${building.name}`}>
                    <img className='w-[400px] h-[150px] object-cover m-auto' src={building.imageUrl} alt={building.name} />
                    <h2 className='mt-1'>{building.name}</h2>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  )
}

export default Building
