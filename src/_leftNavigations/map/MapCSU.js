import React from 'react'

const MapCSU = () => {
  return (
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
  )
}

export default MapCSU
