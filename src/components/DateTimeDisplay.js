import React, { useState, useEffect } from 'react';

function DateTimeDisplay() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every 1 second (1000 milliseconds)

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, []);

  // Date options
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // Time options
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const formattedDate = currentDateTime.toLocaleDateString(undefined, dateOptions);
  const formattedTime = currentDateTime.toLocaleTimeString(undefined, timeOptions);

  return (
    <div className='text-center'>
      <p>{formattedDate}</p>
      <p>{formattedTime}</p>
    </div>
  );
}

export default DateTimeDisplay;
