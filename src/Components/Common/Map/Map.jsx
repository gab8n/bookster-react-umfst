import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import axios from 'axios';
Geocode.setApiKey('AIzaSyBtHGJjbJlmgBQ1S1ivJqKwDTlfGAgRSwA');
Geocode.enableDebug();

const options = {
  streetViewControl: false,
  disableDefaultUI: true,
  mapId: 'b135edc3d2771bc7',
};

const Map = ({ setUserInfo }) => {
  const mapStyles = {
    height: '100%',
    width: '100%',
  };

  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          setAdressFormData(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          alert('Unaviable Location!');
        }
      );
    } else {
      alert('Unaviable Location!');
    }
  }, [navigator]);

  //This function get hhe province data from the object returned by geolocation
  const getStateProvince = (addressArray) => {
    let province;
    addressArray.forEach((element) => {
      if (
        element.types[0] &&
        'administrative_area_level_1' === element.types[0]
      ) {
        province = element.long_name;
      }
    });
    return province ? province : '';
  };

  //This function getThe city data from the object returned by geolocation
  const getCity = (addressArray) => {
    let firstVariantCity;
    let secondVariantCity;
    addressArray.forEach((element) => {
      if (element.types[0] && 'locality' === element.types[0]) {
        firstVariantCity = element.short_name;
      }
      if (
        element.types[0] &&
        'administrative_area_level_2' === element.types[0]
      ) {
        secondVariantCity = element.short_name;
      }
    });

    return firstVariantCity ? firstVariantCity : secondVariantCity;
  };

  //This function get the data from lat and lng of the dragged marker on map and set the data on the value inputs of the forms
  //It also  get the postal code from the geonames api using axios
  const setAdressFormData = (lat, lng) => {
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const addressArray = response.results[0].address_components;
        const address = response.results[0].formatted_address;

        axios
          .get(
            `http://api.geonames.org/findNearbyPostalCodesJSON?lat=${lat}&lng=${lng}&username=gab8n`
          )
          .then((res) => {
            setUserInfo((prevState) => ({
              ...prevState,
              zipCode: res.data.postalCodes[1]
                ? res.data.postalCodes[1].postalCode
                : '',
            }));
          });
        setUserInfo((prevState) => ({
          ...prevState,
          city: getCity(addressArray),
          streetAddress: address,
          state: getStateProvince(addressArray),
        }));
      },
      (error) => {
        alert('Error: ' + error);
      }
    );
  };

  const onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();
    setAdressFormData(newLat, newLng);
  };
  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyBtHGJjbJlmgBQ1S1ivJqKwDTlfGAgRSwA">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={17}
          center={location}
          options={options}
        >
          <Marker
            name={'Dolores park'}
            title={'The marker`s title will appear as a tooltip.'}
            draggable={true}
            onDragEnd={(e) => onMarkerDragEnd(e)}
            position={location}
          />
          <Marker />
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default Map;
