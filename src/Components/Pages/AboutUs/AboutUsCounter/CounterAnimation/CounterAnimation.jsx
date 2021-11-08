import { useEffect, useState } from 'react';
import styles from 'Components/Pages/AboutUs/AboutUsCounter/CounterAnimation/CounterAnimation.module.scss';

const CounterAnimation = ({ label, number, duration, unit }) => {
  const [counter, setCounter] = useState(0);
  const { container, labelStyle, numberStyle } = styles;

  useEffect(() => {
    let start = 0;
    if (start === parseInt(number)) return;

    let incrementSpeed = (parseInt(duration) / number) * 1000;
    let timer = setInterval(() => {
      start += 1;
      setCounter(start);
      if (start === parseInt(number)) clearInterval(timer);
    }, incrementSpeed);

    return () => {
      clearInterval(timer);
    };
  }, [number, duration]);

  return (
    <div className={container}>
      <p className={labelStyle}>{label}:</p>
      <p className={numberStyle}>
        {counter}
        {unit}
      </p>
    </div>
  );
};

export default CounterAnimation;
