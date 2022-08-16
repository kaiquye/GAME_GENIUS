import css from '../Button/styles/css.module.css';
import { useEffect, useState } from 'react';

export function Select({ ref_, click, style, children, position, color }) {
  const [positionBtn, setPosition] = useState();

  useEffect(() => {
    switch (position) {
      case 'LEFT':
        setPosition(css.Button_LEFT);
        break;
      case 'RIGHT':
        setPosition(css.Button_RIGHT);
        break;
      case 'LEFT_BOTTON':
        setPosition(css.Button_LEFT_BOTTON);
        break;
      case 'RIGHT_BOTTON':
        setPosition(css.Button_LEFT_BOTTOM);
        break;
    }
  }, []);

  return (
    <section>
      {positionBtn && (
        <div ref={ref_} onClick={() => click(color)} className={positionBtn}>
          {children}
        </div>
      )}
    </section>
  );
}
// setUserOrder([...userOrder, 'YELLOW'])
