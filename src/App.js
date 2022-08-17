import css from './App.module.css';
import { useState, useRef, useEffect } from 'react';
import { Select } from './componets/Button';
import LightBuild from "./services/lightBulb";
import checkResult from "./services/checkResult";
import music from './seeds/Baby Shark  Remix funk.mp3'
import risadaFail from './seeds/Errou - Faustao Falando.mp3'
function App() {

  const [start, setStart] = useState(true)
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0)

  const [gameOver, setGameOver] = useState(false);

  const [rounds, setRounds] = useState(0);
  const [proceed, setProceed] = useState(true);


  // There are two types of players CPU and USER
  const [current_CPU_Order, setCurrent_CPU_Order] = useState([]);
  const [current_USER_Order, setcurrent_USER_Order] = useState(['']);

  const COLOR = ['RED', 'BLUE', 'GREEN', 'YELLOW'];

  const GREEN = useRef();
  const RED = useRef();
  const BLUE = useRef();
  const YELLOW = useRef();

  const lightOn = LightBuild({RED, GREEN, BLUE, YELLOW})
  const check = checkResult({StartGame, current_CPU_Order, current_USER_Order})

  function fail(){
    new Audio(risadaFail).play()
    setGameOver(true)
  }

  function selectColor(color) {
    if(!playing){
      const sucess = checkResult({StartGame, current_CPU_Order, current_USER_Order, color, fail})()

      if(sucess){
        setcurrent_USER_Order([...current_USER_Order, color]);
      }
    }
  }

  async function StartGame() {
    setRounds(rounds + 1);
    setPlaying(true);
    setGameOver(false);
    setProceed(false);

    // order : temporary array, used only to add the new randomly generated color.
    let order = [];
    // adding colors from past round
    order.push(...current_CPU_Order);

    // generating random number to access an array position ( color )
    const randomNumber = Math.floor(Math.random() * COLOR.length);
    // accessing color random
    const currentColor = COLOR[randomNumber];

    order.push(currentColor);

    // turning on array lights ( position by position )
    for (let i = 0; order.length > i; i++) {
      await lightOn(order[i]);
    }

    // adding the array with the new color to a state
    setCurrent_CPU_Order(order);

    setcurrent_USER_Order([])
    setPlaying(false);
  }

  return (
      <div className={css.app}>
        {gameOver === true ?
            <div className={css.gameOver}></div>
            :
            <>
              <div className={css.level}>
                <label className={css.title}>Genius Game</label>
                <div className={css.imageFunny}></div>
                <label>Level : <strong style={{color: 'white'}}>{rounds}</strong></label>
                <label>Playing : <strong style={{color: 'white'}}>{playing === true ? 'Machine' : 'You'}</strong></label>
              </div>
              <section className={css.bodyGame}>
                <main className={css.game}>
                  <div className={css.menuGame}>
                    <div>
                      {start &&
                          <button
                              className={css.startBtn}
                              onClick={async () => {
                                setStart(false)
                                await StartGame();
                              }}
                          >
                            INICIAR
                          </button>
                      }
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
            </>
        }
          </div>
          );
}

export default App;

