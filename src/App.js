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

    order.push(...currentOrder);
    const randomNumber = Math.floor(Math.random() * COLOR.length);
    const currentColor = COLOR[randomNumber];
    order.push(currentColor);

    for (let i = 0; order.length > i; i++) {
      await execute(order[i]);
    }

    setCurrentOrder(order);
    setPlaying(false);
  }

  function checkResult() {
    console.log(userOrder);
    const keys = Object.values(currentOrder);
    const keysByUser = Object.values(userOrder).filter(value => value !== '');
    const result = keys.filter((color, index) => color === keysByUser[index]);
    const tamanhoOriginal = keys.length;
    const totalDeAcertos = result.length;

    if (tamanhoOriginal !== totalDeAcertos) {
      alert('errou');
      setCurrentOrder([]);
      setUserOrder([]);
    }

    StartGame();
    console.log(tamanhoOriginal);
    console.log(totalDeAcertos);
  }

  function selectColor(color) {
    setUserOrder([...userOrder, color]);
  }

  return (
    <div className={css.app}>
      <section className={css.bodyGame}>
        <main className={css.game}>
          <div className={css.menuGame}>
            <div>
              {playing === false ? (
                <>
                  <button
                    className={css.startBtn}
                    onClick={async () => await StartGame()}
                  >
                    INICIAR
                  </button>
                  <button
                    className={css.startBtn}
                    style={{ backgroundColor: 'red' }}
                    onClick={() => checkResult()}
                  >
                    VERIFICAR
                  </button>
                </>
              ) : (
                <button className={css.running}>running</button>
              )}
            </div>
          </div>
          <div className={css.displayGame}>
            <Select
              ref_={GREEN}
              click={selectColor}
              color={'GREEN'}
              position={'LEFT'}
            ></Select>
            <Select
              ref_={RED}
              click={selectColor}
              color={'RED'}
              position={'RIGHT'}
            ></Select>
            <Select
              ref_={BLUE}
              color={'BLUE'}
              click={selectColor}
              position={'LEFT_BOTTON'}
            ></Select>
            <Select
              ref_={YELLOW}
              color={'YELLOW'}
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
