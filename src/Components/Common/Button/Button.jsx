import styles from 'Components/Common/Button/Button.module.scss';
const Button = ({
  className,
  label,
  type,
  onClick,
  textButton,
  startAdorment,
  endAdorment,
}) => {
  const { buttonStyle } = styles;
  return (
    <button
      onClick={(e) => onClick && onClick(e)}
      className={className ? className : buttonStyle}
      type={type && type}
    >
      {startAdorment && startAdorment}
      <span className={textButton && textButton}>{label}</span>
      {endAdorment && endAdorment}
    </button>
  );
};

export default Button;
