import styles from 'Components/Common/Button/Button.module.scss';

const Button = ({ className, label, type, onClick }) => {
  const { buttonStyle } = styles;
  return (
    <button
      onClick={(e) => onClick(e)}
      className={className ? className : buttonStyle}
      type={type && type}
    >
      {label}
    </button>
  );
};

export default Button;
