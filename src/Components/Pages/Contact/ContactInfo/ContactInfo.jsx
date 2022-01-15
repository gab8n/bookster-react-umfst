import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useState } from 'react';

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import Button from 'Components/Common/Button/Button';
import styles from './ContactInfo.module.scss';
const {
  contactInfoContainer,
  infoContainer,
  additionalInfo,
  info,
  infoContainerTitle,
  streetAdressInfo,
  infoText,
  infoIcon,
} = styles;

const ContactInfo = () => {
  const mapStyles = {
    height: '50vh',
    width: '100%',
  };

  const [location, setLocation] = useState({
    lat: 46.543295661695126,
    lng: 24.558231108004726,
  });

  const options = {
    streetViewControl: false,
    disableDefaultUI: true,
    mapId: 'ce1bf8e86289ddad',
    gestureHandling: 'none',
    zoomControl: false,
    clickableIcons: false,
  };
  const openMapOnLocation = (lat, lng) => {
    window.open('https://maps.google.com?q=' + lat + ',' + lng);
  };
  return (
    <div className={contactInfoContainer}>
      <LoadScript googleMapsApiKey="AIzaSyBtHGJjbJlmgBQ1S1ivJqKwDTlfGAgRSwA">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={17}
          center={{
            lat: location.lat,
            lng: location.lng - 0.003,
          }}
          options={options}
        >
          <Marker
            position={location}
            icon={'https://i.ibb.co/c3bn3n4/imageedit-5-6909546968.png'}
          />
          <Marker
            position={{
              lat: location.lat - 0.00015,
              lng: location.lng,
            }}
            icon="none"
            label={{
              color: '#958ada',
              fontWeight: 'bold',
              fontSize: '20px',
              text: 'Waiting for you',
            }}
          />
          <Marker />
        </GoogleMap>
      </LoadScript>
      <div className={infoContainer}>
        <h3 className={infoContainerTitle}>Stop on by a good book to read.</h3>
        <div className={additionalInfo}>
          <div className={info}>
            <FaMapMarkerAlt className={infoIcon} />
            <h4 className={infoText}>
              Biblioteca UMFST Mureș
              <p className={streetAdressInfo}>
                Strada Gheorghe Marinescu 38,
                <br /> Târgu Mureș
              </p>
            </h4>
          </div>
          <div>
            <div className={info}>
              <FaPhoneAlt className={infoIcon} />
              <h4 className={infoText}>+40-775-5567-243</h4>
            </div>
            <div className={info}>
              <FaEnvelope className={infoIcon} />
              <h4 className={infoText}>booksterUmfst@gmail.com</h4>
            </div>
          </div>
        </div>
        <Button
          label={'GET DIRECTIONS'}
          onClick={() => openMapOnLocation(location.lat, location.lng)}
        />
      </div>
    </div>
  );
};

export default ContactInfo;
