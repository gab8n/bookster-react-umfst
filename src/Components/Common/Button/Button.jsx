import styles from 'Components/Common/Button/Button.module.scss';

const Button = ({ className, label, type, onClick }) => {
  const { buttonStyle } = styles;
  return (
    <button
      onClick={onClick}
      className={className ? className : buttonStyle}
      type={type && type}
    >
      {label}
    </button>
  );
};

export default Button;
