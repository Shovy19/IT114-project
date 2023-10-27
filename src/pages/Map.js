import React, { useState, useEffect } from 'react';
import DateTimeDisplayFlex from '../components/DateTimeDisplayFlex';

import "./Login.css"
import DropdownMenu from '../components/DropdownMenu';
import { Link, useLocation } from 'react-router-dom';

import { client } from '../lib/sanityClient';

const Map = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      // Your search query
      const query = `*[_type == 'room' && roomName match $searchTerm] | order(roomName) {
        roomName,
        buildingName->{
          title
        },
        shortDescription,
        roomImage
      }`;

      client.fetch(query, { searchTerm: `*${searchTerm}*` }).then((results) => {
        setSearchResults(results);
      });
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const toggleDescription = (roomName) => {
    if (selectedRoom === roomName) {
      setSelectedRoom(null); // Close the description if it's already open
    } else {
      setSelectedRoom(roomName); // Show the description of the clicked room
    }
  };

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const username = params.get('username');

  return (
    <div className='background-image-overlay overflow-y-scroll '>
      <section className='md:h-screen grid md:grid-cols-9 lg:grid-cols-7'>

        <article className='bg-slate-400 md:col-span-3 lg:col-span-2 text-center'>
          <Link to={`/Homepage?username=${username}`}>
            <h1 className='text-3xl md:text-4xl bg-green-600 py-4 text-slate-200 font-bold'>
                CSU Map
              </h1>
          </Link>

          <input
            className='mt-3 px-5 py-2 rounded-md w-3/4 outline-none'
            type="text"
            placeholder="Search for a room"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="mt-4 mx-4">
            <ul>
              {searchResults.map((room) => (
                <li key={room._id} className='bg-slate-200 mt-2 py-3 rounded-md'>
                  <h3 className='text-slate-800 cursor-pointer' onClick={() => toggleDescription(room.roomName)}>Room: {room.roomName}</h3>
                  {selectedRoom === room.roomName && (
                    <p className='text-slate-800 border-t-1 border-slate-600'>location: {room.shortDescription || 'No Description'}</p>
                    
                  )}
                </li>
              ))}
            </ul>
          
          </div>
        </article>

        <article className='relative md:relative md:col-span-6 lg:col-span-5 bg-slate-400'>
        <div className='absolute right-1 top-1'>
          <DropdownMenu />
        </div>
        <div>
          <iframe
            title="Google Map"
            width="100%"
            height="740 px"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1362.269514384796!2d125.59784585836451!3d8.950536014885724!2m3!1f348.5156250000002!2f23.93606951422922!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x3301eac565a4abe5%3A0x87859279e2e3f66a!2sCaraga%20State%20University!5e1!3m2!1sen!2sph!4v1697291333032!5m2!1sen!2sph"
            allowFullScreen
          ></iframe>
        </div>  
        <footer className='absolute md:bottom-0 md:left-0 md:right-0 flex justify-center gap-8 text-slate-600 font-semibold py-3
                bg-green-600'>
                 {username && <p>User: {username}</p>} 
                 <DateTimeDisplayFlex />
              </footer>
        </article>

      </section>
      

    </div>
  )
}

export default Map
