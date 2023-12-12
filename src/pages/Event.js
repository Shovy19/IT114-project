import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { client } from '../lib/sanityClient';

import DropdownMenu from '../components/DropdownMenu';

import DateTimeDisplayFlex from '../components/DateTimeDisplayFlex'
import LeftNavigationEvent from '../components/LeftNavigationEvent';

import "./Login.css"

const Event = () => {

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const username = params.get('username');

  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch all "event" documents
    const query = `*[_type == 'event'] {
      title,
      slug,
      mainImage,
      publishedAt,
      address,
      body
    }`;

    client.fetch(query).then((data) => {
      setEvents(data);
      console.log(data)
    });
  }, []);

  return (
    <>
      <div className='flex h-screen'>
        <section className='bg-green-600 w-[350px] pt-5'>
          <Link to='/Homepage'>
            <h1 className='text-center text-white text-3xl font-bold'>CSU Events</h1>

          </Link>
          <div>
            <LeftNavigationEvent />
          </div>
         
          
        </section>

        <div className='absolute right-3 top-1'>
          <DropdownMenu />
        </div>

        <section className='background-image-overlay grow'>
          <div>
            <h1 className=' text-center mb-10 mt-14 text-5xl font-bold text-slate-600'>Event List</h1>
            <ul className='mx-6 grid grid-cols-2 gap-1'>
              {events.map((event) => (
                <li key={event.slug.current} className='bg-green-800 rounded-lg py-2 px-7'>
                  <h2 className='text-xl'>{event.title}</h2>
                  <p className='text-sm text-slate-400'>Location: {event.address}</p>
                  <p className='text-sm'>Date: {event.publishedAt}</p>
                  <p>Description: {event.body}</p>
                </li>
              ))}
            </ul>
          </div>
         
        </section>
      </div>
    </>
  )
}

export default Event
