import styles from 'Components/Common/Button/Button.module.scss'

const Button = ({className, label, type}) => {

    const {buttonStyle} = styles;
    return ( 
        <button className={className ?className :buttonStyle} type={type && type}>{label}</button>
     );
}
 
export default Button;