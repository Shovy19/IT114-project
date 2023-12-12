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

  const storedUserId = localStorage.getItem('userId');

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


  return (
    <>
      <div className='flex h-screen'>
        <section className='bg-green-600 w-[350px] pt-5'>
          <Link to='/Homepage'>
            <h1 className='text-center text-white text-3xl font-bold'>CSU Map</h1>
          </Link>
          <div className='text-center'>
            <input
              className='mt-3 px-5 py-2 rounded-sm w-3/4 outline-none'
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
          </div>

          <div>
            
          </div>
        </section>

        <div className='absolute right-3 top-1'>
          <DropdownMenu />
        </div>

        <section className='background-image-overlay grow'>
          <div className='ml-4 absolute'>
            <Link to='/Homepage'>
                <p className='bg-green-800 w-fit px-7 py-1 text-white rounded-sm mt-5 ml-4'>Back</p>
            </Link>
          </div>
          <div>
            <iframe
              title="Google Map"
              className='w-full h-screen'
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1362.269514384796!2d125.59784585836451!3d8.950536014885724!2m3!1f348.5156250000002!2f23.93606951422922!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x3301eac565a4abe5%3A0x87859279e2e3f66a!2sCaraga%20State%20University!5e1!3m2!1sen!2sph!4v1697291333032!5m2!1sen!2sph"
              allowFullScreen
            ></iframe>
          </div>  
         
            
         
        
        </section>
      </div>
    </>
  )
}

export default Map
