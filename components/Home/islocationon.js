import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LocationCheck = () => {
  useEffect(() => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location accessed:', position);
      },
      (error) => {
        console.error('Error accessing location:', error);
        toast.error('Please turn on location and refresh the page.');
      }
    );
  }, []);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default LocationCheck;
