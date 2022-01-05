import React, { useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import Input from 'Components/Common/Input/Input';
// import Map from 'components/common/Map';
import Map from 'Components/Common/Map/Map';

import styles from './AdressMapInput.module.scss';

const {
  mapAdressContainer,
  mapContainer,
  adressInputContainer,
  locationIcon,
  input,
} = styles;

const AdressMapInput = ({ name, value, placeholder, onChange, className }) => {
  const [isActive, setisActive] = useState(false);
  const toggleActive = () => {
    setisActive(!isActive);
  };

  return (
    <div className={mapAdressContainer}>
      <div className={adressInputContainer}>
        <Input
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
          className={`${className} ${input}`}
        />
        <BiCurrentLocation className={locationIcon} onClick={toggleActive} />
      </div>
      {isActive ? (
        <div className={mapContainer}>
          <Map setUserInfo={onChange} />
        </div>
      ) : null}
    </div>
  );
};

export default AdressMapInput;
