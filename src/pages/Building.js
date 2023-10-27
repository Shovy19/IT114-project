import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { client } from '../lib/sanityClient'
import sanityClient from '@sanity/client';

import DateTimeDisplayFlex from '../components/DateTimeDisplayFlex'
import "./Login.css"
import DropdownMenu from '../components/DropdownMenu'
import background from "../images/Background.jpg"


const Building = () => {

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const username = params.get('username');

  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const query = `*[_type == 'building']{
      name,
      location,
      description,
      'imageUrl': image.asset->url
    }`;
    
    client.fetch(query)
      .then((data) => {
        setBuildings(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    
    <div className='background-image-overlay overflow-y-scroll'>

      <div className='text-slate-100 font-bold text-5xl ml-5 mt-3 hover:text-slate-300 w-min'>
        <Link to={`/Homepage?username=${username}`}>
        <h1 >CSU</h1>
        </Link>
      </div>

      <div className='right-7 top-1 absolute'>
        <DropdownMenu />
      </div>  
 
      <div>
        <ul className='pt-40 pb-5 px-3 grid lg:grid-cols-4 gap-3 text-center'>
          {buildings.map((building, index) => (
            <li className='bg-slate-500 p-1 rounded-lg shadow-lg' key={index}>
              <img className='w-full object-cover' src={building.imageUrl} alt={building.name} />
              <h2 >{building.name}</h2>
              <p>Location: {building.location}</p>
              <p>Description: {building.description}</p>
            </li>
          ))}
        </ul>
      </div>

     
      
    </div>
  )
}

export default Building
