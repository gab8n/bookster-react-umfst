import CheckBox from 'Components/Common/CheckBox/CheckBox';
import { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import styles from './MultiselectFilter.module.scss';

const MultiselectFilter = ({ title, options, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
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
