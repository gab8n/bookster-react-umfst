import styles from 'Components/Common/Input/Input.module.scss';

const Input = ({
  type,
  name,
  placeholder,
  onChange,
  onSubmit,
  className,
  value,
  disabled,
}) => {
  const { inputStyle } = styles;
  return (
    <input
      value={value && value}
      name={name && name}
      type={type ? type : ''}
      placeholder={placeholder && placeholder}
      onChange={(e) => onChange && onChange(e)}
      onSubmit={(e) => onSubmit && onSubmit(e)}
      className={className ? `${inputStyle} ${className}` : inputStyle}
      disabled={disabled && disabled}
    />
  );
};

export default Input;
