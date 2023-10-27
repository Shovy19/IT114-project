import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { client } from '../lib/sanityClient';

import DropdownMenu from '../components/DropdownMenu';

import DateTimeDisplayFlex from '../components/DateTimeDisplayFlex'

import "./Login.css"

const Homepage = () => {
    // Use the useLocation hook to access the query parameters
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const username = params.get('username');

    const [events, setEvents] = useState([]);

    useEffect(() => {
      client
        .fetch(
          `*[_type == "event"] | order(publishedAt desc) {
            title,
            slug,
            body,
            publishedAt,
            mainImage {
              asset -> {
                _id,
                url
              },
              alt,
            },
            address,
          }`
        )
        .then((data) => {
          setEvents(data.slice(0, 3));
        })
        .catch(console.error);
    }, []);


    const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "announcement"] | order(date desc) {
          title,
          date,
          content,
          author,
          image {
            asset -> {
              _id,
              url
            },
            alt,
          },
        }`
      )
      .then((data) => {
        setAnnouncements(data);
      })
      .catch(console.error);
  }, []);

    return (
        <div className='background-image-overlay overflow-y-scroll '>
          <section className='md:h-screen grid md:grid-cols-9 lg:grid-cols-7'>

            <div className='bg-slate-300 md:col-span-3 lg:col-span-2 text-center'>
              <h1 className='text-3xl md:text-4xl bg-green-600 py-4 text-slate-200 font-bold'>
                CSU - NEWS
              </h1>

              <div className='mt-5 px-5'>
               
                <h1 className='mb-3 text-xl font-medium text-slate-500 mt-3 '>Announcement</h1>


                <div>
                  {announcements.map((announcement) => (
                    <div key={announcement._id} className='bg-slate-700 rounded-lg text-left px-3 py-2 mb-2'>
                      <h2 className='text-slate-200 font-medium text-lg'>{announcement.title}</h2>
                      <p className='text-xs text-slate-400 font-meduim'>Date: {new Date(announcement.date).toLocaleString()}</p>
                      <p className='text-xs text-slate-400 font-meduim'>Author: {announcement.author}</p>
                    </div>
                  ))}
                </div>
             
                <h1 className='mb-3 text-xl font-medium text-slate-500 mt-3'>Upcoming Events</h1>

                {events.map((event) => (
                      <div key={event.slug.current} className='bg-slate-700 rounded-lg text-left px-3 py-2 mb-2'>
                        <h2 className='text-slate-200 font-medium text-lg'>{event.title}</h2>
                        <p className='text-xs text-slate-400 font-meduim'>Published on {new Date(event.publishedAt).toLocaleDateString()}</p>

                      </div>
                ))}

                <h1 className='mb-3 text-xl font-medium text-slate-500 mt-3 '>Recent Events</h1>
              
                <section className='grid gap-2 font-sans'>
                  <article className='bg-slate-700 rounded-lg text-left px-3 py-2'>
                    <h1 className='text-slate-200 font-medium text-lg'>Title of events</h1>
                    <p className='text-xs text-slate-400 font-meduim'>Brgy. Julia Gwapa at 12:00 to 12:00 noon</p>

                  </article>
                </section>

              </div>
              <div>
                
              </div>
              <div>
                
              </div>

            </div>

            <div className='md:relative md:col-span-6 lg:col-span-5'>

              <div className='absolute bg-black-300 w-lg right-1 top-1 rounded-lg'>
              <DropdownMenu />
              </div>
             
              
              <footer className='absolute md:bottom-0 md:left-0 md:right-0 flex justify-center gap-8 text-slate-600 font-semibold py-3
                bg-green-600'>
                 {username && <p>User: {username}</p>} 
                 <DateTimeDisplayFlex />
              </footer>
            </div>
          </section>


        </div>
    );
};

export default Homepage;
