import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { client } from '../lib/sanityClient';

import DropdownMenu from '../components/DropdownMenu';

import DateTimeDisplayFlex from '../components/DateTimeDisplayFlex'

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
    <div className='background-image-overlay'>
      <section className='md:h-screen grid md:grid-cols-9 lg:grid-cols-7'>
        <div className='bg-slate-300 md:col-span-3 lg:col-span-2 text-center'>
          <Link to={`/Homepage?username=${username}`}>
            <h1 className='text-3xl md:text-4xl bg-green-600 py-4 text-slate-200 font-bold'>
                CSU Events
              </h1>
          </Link>

        </div>

        <div className='md:relative md:col-span-6 lg:col-span-5'>

            <div className='absolute bg-black-300 w-lg right-1 top-1 rounded-lg'>
              <DropdownMenu />
            </div>

            <div>
            <h1 className='text-center mb-10 mt-10 text-2xl font-bold text-slate-800'>Event List</h1>
            <ul className='mx-6'>
              {events.map((event) => (
                <li key={event.slug.current} className='bg-green-600 mt-3 rounded-lg py-2 px-7'>
                  <h2 className='text-xl'>{event.title}</h2>
                  <p className='text-sm text-slate-700'>Location: {event.address}</p>
                  <p>Date: {event.publishedAt}</p>
                  <p>Description: {event.body}</p>
                </li>
              ))}
            </ul>
            </div>

        </div>

      </section>
        
    </div>
  )
}

export default Event
