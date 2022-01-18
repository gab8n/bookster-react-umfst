import CreatableSelect from 'react-select/creatable';

import styles from './MultiSelectInput.module.scss';

const MultiSelectInput = ({ defaultValue, label, onChange, optionsSelect }) => {
  const handleChange = (value) => {
    let newArray = [];
    value.map((element) => {
      newArray.push(element.value);
    });
    onChange(newArray);
    defaultValue = newArray;
  };

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      fontWeight: 'bold',
      borderRadius: '12px',
      padding: '10px',
      boxShadow: '6px 6px 13px -9px rgba(0, 0, 0, 0.35)',
      border: 'none',
    }),
    menu: (styles) => ({
      ...styles,
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: '#958ada',
      borderRadius: '10px',
      color: '#fff',
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: '#fff',
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: '#fff',
      borderBottomRightRadius: '10px',
      borderTopRightRadius: '10px',
      cursor: 'pointer',
      ':hover': {},
    }),
    option: (styles, { isDisabled, isFocused }) => {
      return {
        ...styles,

        color: 'black',
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
  };
  const { selectStyle } = styles;

  return (
    <CreatableSelect
      className={selectStyle}
      isMulti
      label={label}
      placeholder={label}
      options={optionsSelect}
      styles={colourStyles}
      defaultInputValue={defaultValue}
      onChange={(value) => handleChange(value)}
      noOptionsMessage={() => 'Write something...'}
    />
  );
};

export default MultiSelectInput;
