import styles from 'Components/Common/Input/Input.module.scss';

const Input = ({ type, name, placeholder, onChange, className, value }) => {
  const { inputStyle } = styles;
  return (
    <input
      value={value && value}
      name={name && name}
      type={type ? type : ''}
      placeholder={placeholder && placeholder}
      onChange={(e) => onChange(e)}
      className={className ? `${inputStyle} ${className}` : inputStyle}
    />
  );
};

export default Input;
