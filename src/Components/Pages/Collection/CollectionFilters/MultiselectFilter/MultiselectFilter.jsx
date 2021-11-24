import CheckBox from 'Components/Common/CheckBox/CheckBox';
import { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import styles from './MultiselectFilter.module.scss';
// import { setOptions, setFilters } from 'Redux/Ducks/bookCollectionFilters';

const MultiselectFilter = ({ title, options, onChange }) => {
  // console.log(options);
  // const [checkedState, setCheckedState] = useState(
  //   new Array(options.length).fill(false)
  // );
  // console.log(checkedState);

  // dispatch(setFilters(1, 'GENRE'));
  // dispatch(setFilters(2, 'GENRE'));
  // dispatch(setFilters(3, 'GENRE'));

  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // useEffect(() => {
  //   // const filters = options.filter(
  //   //   (element, index) => checkedState[index] === true
  //   // );
  // }, [checkedState]);

  const handleOnChange = (position) => {
    // const updatedCheckedState = checkedState.map((item, index) =>
    //   index === position ? !item : item
    // );
    // setCheckedState(updatedCheckedState);
    onChange(position);
  };

  const {
    multiSelectContainer,
    multiSelectHeader,
    multiSelectTitle,
    expandIcon,
    multiSelectorOptionsContainer,
    noHeight,
  } = styles;
  return (
    <div className={multiSelectContainer}>
      <div className={multiSelectHeader}>
        <h4 className={multiSelectTitle}>{title}</h4>
        {isExpanded ? (
          <AiOutlineMinus className={expandIcon} onClick={toggleExpanded} />
        ) : (
          <AiOutlinePlus className={expandIcon} onClick={toggleExpanded} />
        )}
      </div>
      <div
        className={
          isExpanded
            ? multiSelectorOptionsContainer
            : `${multiSelectorOptionsContainer} ${noHeight}`
        }
      >
        <Scrollbars
          autoHeight
          autoHeightMin={250}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          renderTrackHorizontal={(props) => (
            <div {...props} style={{ display: 'none' }} />
          )}
        >
          {options?.map((element, index) => {
            return (
              <CheckBox
                name={element.option}
                onChange={() => onChange(index)}
                isChecked={options[index].value}
                label={element.option}
              />
            );
          })}
        </Scrollbars>
      </div>
    </div>
  );
};

export default MultiselectFilter;