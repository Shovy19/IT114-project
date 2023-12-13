import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../lib/sanityClient';

import DropdownMenu from '../components/DropdownMenu';
import LeftNavigationBuilding from '../components/LeftNavigationBuilding'

import './Login.css'

const BuildingInfo = () => {
  const { buildingName } = useParams();
  const [building, setBuilding] = useState(null);

  useEffect(() => {
    const fetchBuildingInfo = async () => {
      try {
        const query = `*[_type == 'building' && name == $buildingName]{
          name,
          location,
          description,
          'imageUrl': image.asset->url,
          'images': images[].asset->url,
          'imageLocation': imageLocation.asset->url,
        }`;
        const params = { buildingName };

        const data = await client.fetch(query, params);

        if (data.length > 0) {
          setBuilding(data[0]);
        } else {
          console.error('Building not found');
        }
      } catch (error) {
        console.error('Error fetching building info:', error);
      }
    };

    fetchBuildingInfo();
  }, [buildingName]);

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

        <section className='background-image-overlay grow px-5 overflow-y-auto pb-5'>
            <div className='ml-4'>
                <Link to='/Homepage/Building'>
                    <p className='bg-green-800 w-fit px-7 py-1 text-white rounded-sm mt-5 ml-4'>Back</p>
                </Link>
                {building && (
                  <div className='backgroundTransparent pt-1 mt-8'>
                    <div className='flex ml-4 mt-6'>
                        <img className='w-[400px] h-[250px] rounded-sm object-cover' src={building.imageUrl} alt={building.name} />
                        <div className='pt-3 mx-5'>
                            <h1 className='text-xl text-white font-bold'><span className='font-normal text-lg text-slate-800'>Building name:</span> {building.name}</h1>
                            <p className='font-bold text-white'> <span className='text-slate-800 font-normal text-lg'>Location:</span> {building.location}</p>
                            <p className='text-white'>{building.description}</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-2 ml-4 mt-4 w-[860px] pb-4'>
                        {building.images && building.images.map((image, index) => (
                            <div className='' key={index}>
                                <img src={image} alt={`Image ${index}`} />
                            </div>
                        ))}
                    </div>
                      
                  </div>
                  
                )}

          </div>
        </section>
      </div>
    </>
  );
};

export default BuildingInfo;
