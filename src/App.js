import style from './App.module.css';
import { useState, useRef } from 'react';
import { Button } from './componets/Button';
function App() {
  const [lightRED, setLightRED] = useState(false);
  const [lightGREEN, setLightGREEN] = useState(false);
  const [lightBLUE, setLightBLUE] = useState(false);
  const [lightYELLOW, setLightYELLOW] = useState(false);

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

  function setTime(ref_, color, time) {
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
        await setTime(RED, 'white', 2000);
        await setTime(RED, 'red', 200);
        break;
      case 'GREEN':
        await setTime(GREEN, 'white', 2000);
        await setTime(GREEN, 'green', 200);
        break;
      case 'BLUE':
        await setTime(BLUE, 'white', 2000);
        await setTime(BLUE, 'blue', 200);
        break;
      case 'YELLOW':
        await setTime(YELLOW, 'white', 2000);
        await setTime(YELLOW, 'yellow', 200);
        break;
      default:
    }
  }

  async function StartGame() {
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

  return (
    <div className="App">
      <main>
        <div
          ref={GREEN}
          onClick={() => setUserOrder([...userOrder, 'GREEN'])}
          className={style.GREEN_DEFAULT}
        >
          GREEN
        </div>
        <div
          ref={RED}
          onClick={() => setUserOrder([...userOrder, 'RED'])}
          className={style.RED_DEFAULT}
        >
          RED
        </div>
        <div
          ref={BLUE}
          onClick={() => setUserOrder([...userOrder, 'BLUE'])}
          className={style.BLUE_DEFAULT}
        >
          BLUE
        </div>
        <div
          ref={YELLOW}
          onClick={() => setUserOrder([...userOrder, 'YELLOW'])}
          className={style.YELLOW_DEFAULT}
        >
          YELLOW
        </div>
        <Button position={'LEFT'}>TESTASNTA</Button>
        <Button position={'RIGHT'}>TESTASNTA</Button>
        <Button position={'RIGHT'}>TESTASNTA</Button>
        <Button position={'RIGHT'}>TESTASNTA</Button>

        <button onClick={async () => await StartGame()}>LIGAR</button>
        <button onClick={() => checkResult()}>teste</button>
      </main>
    </div>
  );
}

export default App;
