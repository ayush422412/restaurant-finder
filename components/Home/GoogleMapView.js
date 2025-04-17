import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { UserLocationContext } from '@/context/UserLocationContext';
import { SelectedBusinessContext } from '@/context/SelectedBusinessContext';
import Markers from './Markers';

const containerStyle = {
  width: '100%',
  height: '500px',
  border: '3px solid #ccc '
};

function GoogleMapView({ businessList }) {
  const { userLocation } = useContext(UserLocationContext);
  const { selectedBusiness } = useContext(SelectedBusinessContext);
  const [map, setMap] = useState(null);

  // Load script hook
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    mapIds: ['327f00d9bd231a33'],
  });

  const getValidCenter = () => {
    if (
      selectedBusiness?.geometry?.location &&
      typeof selectedBusiness.geometry.location.lat === 'number' &&
      typeof selectedBusiness.geometry.location.lng === 'number'
    ) {
      return selectedBusiness.geometry.location;
    } else if (
      userLocation &&
      typeof userLocation.lat === 'number' &&
      typeof userLocation.lng === 'number'
    ) {
      return userLocation;
    } else {
      return { lat: 0, lng: 0 };
    }
  };

  useEffect(() => {
    if (
      map &&
      selectedBusiness?.geometry?.location &&
      typeof selectedBusiness.geometry.location.lat === 'number' &&
      typeof selectedBusiness.geometry.location.lng === 'number'
    ) {
      map.panTo(selectedBusiness.geometry.location);
    }
  }, [selectedBusiness, map]);

  if (!isLoaded || !userLocation || !businessList) {
    return <div>Loading map...</div>;
  }

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={getValidCenter()}
        zoom={13}
        options={{ mapId: '327f00d9bd231a33' }}
        onLoad={(mapInstance) => setMap(mapInstance)}
      >
        {/* User Location Marker */}
        {userLocation && (
          <MarkerF
            position={userLocation}
            icon={{
              url: '/user-location.png',
              scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        )}

        {/* Business Markers */}
        {businessList.slice(0, 8).map((item, index) => (
          <Markers business={item} key={index} />
        ))}
      </GoogleMap>
    </div>
  );
}

export default GoogleMapView;
