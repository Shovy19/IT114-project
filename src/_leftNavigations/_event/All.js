import React, { useEffect, useState } from 'react';
import { client } from '../../lib/sanityClient';
import { Link, useLocation } from 'react-router-dom';

import "../../pages/Login.css"

const All = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const username = params.get('username');

    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch all "event" documents
        const query = `*[_type == 'event'] {
        title,
        slug,
        'mainImage': mainImage.asset->url,
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
    <div>
        <h1 className=' text-center mb-10 mt-14 text-5xl font-bold text-slate-600'>Event List</h1>
        <div className='mx-6 grid grid-cols-2 gap-1'>
            {events.map((event) => (
            <div key={event.slug.current} className='bg-green-800 rounded-lg py-2 px-7'>
                <h2 className='text-2xl font-semibold text-white'>{event.title}</h2>
                <p className='text-sm text-slate-200'>Location: {event.address}</p>
                <p className='text-sm'>Date: {event.publishedAt}</p>
                
                <div className=''>
                    <p className='text-white'>Description: {event.body}</p>
                    <img className='my-4' src={event.mainImage} />
                </div>
            </div>
            ))}
        </div>
      
    </div>
  )
}

export default All
