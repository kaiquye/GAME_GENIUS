import css from './App.module.css';
import { useState, useRef } from 'react';
import { Select } from './componets/Button';
function App() {
  const [playing, setPlaying] = useState(false);

  const GREEN = useRef();
  const RED = useRef();
  const BLUE = useRef();
  const YELLOW = useRef();

  const COLOR = ['RED', 'BLUE', 'GREEN', 'YELLOW'];

  const [currentOrder, setCurrentOrder] = useState([]);
  const [userOrder, setUserOrder] = useState(['']);

  function genereteTime(limit) {
    return Math.floor(Math.random() * limit);
  }

  function setTime(ref_, color, time, isAcess) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        ref_.current.style.backgroundColor = color;
        resolve(true);
      }, [time]);
    });
  }

  async function execute(color) {
    switch (color) {
      case 'RED':
        await setTime(RED, '#ff0000', 1400, true);
        await setTime(RED, '#ff4848', 430);
        break;
      case 'GREEN':
        await setTime(GREEN, '#00ff00', 1400, true);
        await setTime(GREEN, '#43d243', 430);
        break;
      case 'BLUE':
        await setTime(BLUE, 'blue', 1400, true);
        await setTime(BLUE, '#3b3bef', 430);
        break;
      case 'YELLOW':
        await setTime(YELLOW, 'yellow', 1400, true);
        await setTime(YELLOW, '#c0c067', 430);
        break;
      default:
    }
  }

  async function StartGame() {
    setPlaying(true);
    let order = [];
    let green = 0;
    let runtime = genereteTime(7);

    while (runtime >= 0) {
      console.log('iniciou');
      const randomNumber = Math.floor(Math.random() * COLOR.length);
      const currentColor = COLOR[randomNumber];
      order.push(currentColor);
      runtime -= 1;
      await execute(currentColor);
    }
    setCurrentOrder(order);
    setTimeout(() => {
      checkResult();
      setPlaying(false);
    }, [1000]);
    console.log(order);
  }

  function checkResult() {
    const keys = Object.values(currentOrder);
    const keysByUser = Object.values(userOrder).filter(value => value !== '');
    const result = keys.filter((color, index) => color === keysByUser[index]);
    const tamanhoOriginal = keys.length;
    const totalDeAcertos = result.length;
    console.log(tamanhoOriginal);
    console.log(totalDeAcertos);
    console.log(result);
  }

  function selectColor(color) {
    setUserOrder([...userOrder, color]);
  }

  return (
    <div className={css.app}>
      <section className={css.bodyGame}>
        <main className={css.game}>
          {/*<div*/}
          {/*  ref={GREEN}*/}
          {/*  onClick={() => setUserOrder([...userOrder, 'GREEN'])}*/}
          {/*  className={style.GREEN_DEFAULT}*/}
          {/*>*/}
          {/*  GREEN*/}
          {/*</div>*/}
          {/*<div*/}
          {/*  ref={RED}*/}
          {/*  onClick={() => setUserOrder([...userOrder, 'RED'])}*/}
          {/*  className={style.RED_DEFAULT}*/}
          {/*>*/}
          {/*  RED*/}
          {/*</div>*/}
          {/*<div*/}
          {/*  ref={BLUE}*/}
          {/*  onClick={() => setUserOrder([...userOrder, 'BLUE'])}*/}
          {/*  className={style.BLUE_DEFAULT}*/}
          {/*>*/}
          {/*  BLUE*/}
          {/*</div>*/}
          {/*<div*/}
          {/*  ref={YELLOW}*/}
          {/*  onClick={() => setUserOrder([...userOrder, 'YELLOW'])}*/}
          {/*  className={style.YELLOW_DEFAULT}*/}
          {/*>*/}
          {/*  YELLOW*/}
          {/*</div>*/}
          <div className={css.menuGame}>
            <div>
              {playing === false ? (
                <button onClick={async () => await StartGame()}>INICIAR</button>
              ) : (
                <button>running</button>
              )}
              {/*<button*/}
              {/*  style={{ backgroundColor: 'red' }}*/}
              {/*  onClick={() => checkResult()}*/}
              {/*>*/}
              {/*  VERIFICAR*/}
              {/*</button>*/}
            </div>
          </div>
          <div className={css.displayGame}>
            <Select ref_={GREEN} click={selectColor} position={'LEFT'}></Select>
            <Select ref_={RED} click={selectColor} position={'RIGHT'}></Select>
            <Select
              ref_={BLUE}
              click={selectColor}
              position={'LEFT_BOTTON'}
            ></Select>
            <Select
              ref_={YELLOW}
              click={selectColor}
              position={'RIGHT_BOTTON'}
            ></Select>
          </div>
        </main>
      </section>
    </div>
  );
}

export default App;
