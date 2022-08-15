import css from '../Button/styles/css.module.css';
import { useEffect, useState } from 'react';

export function Button({ ref, click, style, children, position }) {
  const [positionBtn, setPosition] = useState();

  useEffect(() => {
    setPosition(css.Button_LEFT);
    switch (position) {
      case 'LEFT':
        setPosition(css.Button_LEFT);
        break;
      case 'RIGHT':
        setPosition(css.Button_RIGHT);
        break;
    }
  }, []);

  return (
    <section>
      {positionBtn &&
        ((<>{console.log(positionBtn)}</>),
        (
          <div ref={ref} onClick={() => click} className={positionBtn}>
            {children}
          </div>
        ))}
    </section>
  );
}
// setUserOrder([...userOrder, 'YELLOW'])
