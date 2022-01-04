import styles from './Dropdown.module.scss';
import { RiArrowDropDownFill, RiArrowDropUpFill } from 'react-icons/ri';
import { useState } from 'react';

const Dropdown = ({ options, defaultOption, onSelectOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const [selectedOption, setSelectedOption] = useState(
    defaultOption && options.includes(defaultOption)
      ? defaultOption
      : options[0]
  );

  const handleOptionSelect = (e, option) => {
    e.stopPropagation();
    setSelectedOption(option);
    onSelectOption && onSelectOption(option);
    toggleOpen();
  };

  const {
    container,
    selectedOptionText,
    icon,
    selectableOptionsContainer,
    selectableOptionText,
    hidden,
    selectableOptionTextSelected,
  } = styles;
  return (
    <div className={container} onClick={toggleOpen}>
      <span className={selectedOptionText}>{selectedOption}</span>
      {isOpen ? (
        <RiArrowDropUpFill className={icon} />
      ) : (
        <RiArrowDropDownFill className={icon} />
      )}
      <div className={isOpen ? selectableOptionsContainer : hidden}>
        {options.map((option) => (
          <span
            className={
              option === selectedOption
                ? selectableOptionTextSelected
                : selectableOptionText
            }
            onClick={(e) => handleOptionSelect(e, option)}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
