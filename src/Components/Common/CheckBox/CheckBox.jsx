import styles from './CheckBox.module.scss';

const CheckBox = ({ name, onChange, isChecked, label }) => {
  const { checkboxContainer, checkbox, checkBoxLabel } = styles;
  return (
    <div className={checkboxContainer}>
      <input
        type="checkbox"
        className={checkbox}
        name={name}
        value={name}
        checked={isChecked}
        onChange={onChange}
      />
      <p onClick={onChange} className={checkBoxLabel}>
        {label}
      </p>
    </div>
  );
};

export default CheckBox;
