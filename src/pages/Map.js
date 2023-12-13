import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { client } from '../lib/sanityClient';
import MapCSU from '../_leftNavigations/map/MapCSU';

import DropdownMenu from '../components/DropdownMenu'

import './Login.css'

const Map = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedRoomInfo, setSelectedRoomInfo] = useState(null);
  const selectedRoomRef = useRef(null);

  useEffect(() => {
    if (searchTerm) {
      const query = `*[_type == 'room' && roomName match $searchTerm] | order(roomName) {
        roomName,
        buildingName->{
          name,
          location,
          description,
          image {
            asset -> {
              _id,
              url
            }
          },
          images[] {
            asset -> {
              _id,
              url
            }
          },
          imageLocation {
            asset -> {
              _id,
              url
            }
          }
        },
        shortDescription,
        'roomImage': roomImage.asset->url,
      }`;
      

      client.fetch(query, { searchTerm: `*${searchTerm}*` }).then((results) => {
        setSearchResults(results);

        console.log(results)
      });
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    // Add click event listener to the document
    const handleDocumentClick = (event) => {
      if (selectedRoomRef.current && !selectedRoomRef.current.contains(event.target)) {
        // Clicked outside the selected room, clear the selection
        setSelectedRoom(null);
        setSelectedRoomInfo(null);
      }
    };

    // Attach the event listener
    document.addEventListener('click', handleDocumentClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleRoomClick = (room) => {
    if (selectedRoom === room.roomName) {
      setSelectedRoom(null);
      setSelectedRoomInfo(null);
    } else {
      setSelectedRoom(room.roomName);
      setSelectedRoomInfo(room);
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
                {searchResults.map((room, index) => (
                  <li key={index} className='bg-slate-200 mt-2 py-3 rounded-md'>
                    <h3
                      ref={selectedRoom === room.roomName ? selectedRoomRef : null}
                      className='text-slate-800 cursor-pointer'
                      onClick={() => handleRoomClick(room)}
                    >
                      Room: {room.roomName}
                    </h3>
                    {selectedRoom === room.roomName && (
                      <p className='text-slate-800 border-t-1 border-slate-600'>
                        -------
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className='absolute right-3 top-1'>
          <DropdownMenu />
        </div>

        <section className='background-image-overlay grow'>
          {/* Conditionally render MapCSU or selected room information */}
          {selectedRoom ? (
            <div className='backgroundTransparent-extra mx-6 mt-[100px] px-6 py-4 flex gap-2 rounded-sm'>
              <div className=''>
                <div className='flex gap-2 items-center'>
                  <div className='text-center'>
                    {selectedRoomInfo.buildingName && selectedRoomInfo.buildingName.image && (
                      <img src={selectedRoomInfo.buildingName.image.asset.url} alt='Building Image' className='w-[400px]' />
                    )}
                    <p className='text-white mt-1 text-xl font-semibold'>Building: {selectedRoomInfo.buildingName.name}</p>
                  </div>
                  <div className='ml-5 grow'>
                    <p className='text-white text-2xl'>Room: {selectedRoomInfo.roomName}</p>
                    <div className='bg-green-600 mt-4 px-3 py-1 text-white rounded-md shadow-md' >
                      <p className='text-slate-300 text-lg'>Description:</p>
                      <p className='shadow-sm'>{selectedRoomInfo.shortDescription}</p>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-4 mt-5'>
                  <p className='text-white pb-4 text-lg'>Room Image</p>
                  {selectedRoomInfo.roomImage && (
                    <img className='w-[450px]' src={selectedRoomInfo.roomImage} />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <MapCSU />
          )}
        </section>
      </div>
    </>
  );
};

export default Map;
