'use client'
import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetTime: number; // Unix timestamp in milliseconds
  onComplete?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ targetTime, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetTime - Date.now();
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (onComplete) onComplete();
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, [targetTime, onComplete]);

  return (
    <div className="flex flex-col items-center bg-stone-900 p-10 rounded-2xl gap-5 text-lg font-semibold">
      <p className='text-white p-y'>Time Remaining</p>
      <div className="flex justify-center items-center gap-5">
        {timeLeft.days > 0 && (
          <div className="flex flex-col items-center">
            <span className="text-2xl">{timeLeft.days}</span>
            <span className="text-sm">Days</span>
          </div>
        )}
        <div className="flex flex-col items-center">
          <span className="text-2xl">{timeLeft.hours.toString().padStart(2, '0')}</span>
          <span className="text-sm">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl">{timeLeft.minutes.toString().padStart(2, '0')}</span>
          <span className="text-sm">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl">{timeLeft.seconds.toString().padStart(2, '0')}</span>
          <span className="text-sm">Seconds</span>
        </div>
      </div>
      <button className='bg-[#EFDA1C] text-white px-4 py-2 rounded-xl'>Bid Now</button> 
    </div>
  );
};

export default Countdown;
