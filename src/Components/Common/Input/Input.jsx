import styles from 'Components/Common/Input/Input.module.scss';

const Input = ({ type, placeholder, onChange, className }) => {
  const { inputStyle } = styles;
  return (
    <input
      type={type ? type : ''}
      placeholder={placeholder && placeholder}
      onChange={(e) => onChange(e)}
      className={inputStyle}
    />
  );
};

export default Input;
