import React, { useState } from 'react';

import DateTimeDisplay from '../components/DateTimeDisplay'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'

import { client } from '../lib/sanityClient'; // Assuming your client object is exported from sanityClient

const Login = () => {

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleLogin = async () => {
        // Query Sanity to check if the user exists
        const query = `*[_type == 'user' && id == $userId && password == $password]`;
        const params = { userId, password };


        try {
        const result = await client.fetch(query, params);
        if (result.length > 0) {
            // User exists, redirect to userhome
            history(`/Homepage?username=${result[0].id}`);
            
        } else {
            // User doesn't exist or the password is incorrect
            alert('Invalid user or password');
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };
  return (
    <>
        <section className="background-image overflow-hidden">
            <div>
                 {/* this is the top */}
                <div className=' bg-green-500 p-4'>
                    <div className='md:flex justify-center'>
                        <div className='flex justify-center items-center '>
                            <h1 className='text-md md:text-xl text-slate-100 font-medium'>Welcome to CARAGA STATE UNIVERSITY - MAIN CAMPUS</h1>
                        </div>
                        <div className='mx-12 text-sm text-slate-100'>
                            <DateTimeDisplay />
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex items-center justify-center h-3/4">
            <div className="max-w-lg bg-slate-200 rounded-lg overflow-hidden">
                <h2 className='p-8 bg-green-500 text-xl font-medium text-slate-100'>Please type your ID No./Visitor ID No.</h2>

                <div className="px-7 py-3">
                <input 
                    className='w-full py-2 px-5 outline-none border-2 border-slate-600 rounded-md mb-2' 
                    type="text" 
                    placeholder="Student ID/Visitor ID" 
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                 <input 
                    className='w-full py-2 px-5 outline-none border-2 border-slate-600 rounded-md mb-2' 
                    type="text" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-7 mb-3">
                    <Link to={"/"}>
                        <button className='w-full px-5 py-1 text-white rounded-md bg-green-500'>Back</button>
                    </Link>
                    <button onClick={handleLogin} className='w-full px-5 py-1 text-white rounded-md bg-green-500'>Submit</button>
                </div>

                </div>
            </div>
            </div>
        </section>

    </>
  )
}

export default Login