import style from './App.module.css'
import {useState} from "react";
function App() {
    const [lightRED, setLightRED] = useState(false)
    const [lightGREEN, setLightGREE] = useState(false)
    const [lightBLUE, setLightBLUE] = useState(false)
    const [lightYELLOW, setLightYELLOW] = useState(false)

    const COLOR = ['RED', 'BLUE', 'GREEN', 'YELLOW']

    const [currentOrder, setCurrentOrder] = useState([])
    const [userOrder, setUserOrder] = useState([])

    const lightOf = {
     'background-color': 'green'
    }

    const lightOn = {
        'background-color': 'red'
    }

    function genereteTime (limit) {
        return (Math.floor(Math.random() * limit));
    }

    function STARTGAME(){
      let order = []
      let runtime = genereteTime(10);

      while (runtime >= 0){
          const randomNumber = Math.floor(Math.random() * COLOR.length);
          const currentColor = COLOR[randomNumber]
          switch (currentColor) {
              case "RED" :
                  setLightRED(true);
                  setTimeout(()=>{
                      setLightRED(false)
                  }, [55])
              case "BLUE" :
                  setLightBLUE(true);
                  setTimeout(()=>{
                      setLightBLUE(false)
                  }, [55])
              case "GREEN" :
                  setLightGREE(true);
                  setTimeout(()=>{
                      setLightGREE(false)
                  }, [55])
              case "YELLOW" :
                  setLightYELLOW(true);
                  setTimeout(()=>{
                      setLightYELLOW(false)
                  }, [55])
          }
          order.push(currentColor)
          runtime -= 1
      }

      setCurrentOrder(order)

      console.log(order)
    }

  return (
    <div className="App">
        <main style={lightRED === true ? lightOn : lightOf}>
            <div className={style.GREEN_DEFAULT}>
                GREEN
            </div>
            <div  className={style.RED_DEFAULT}>
                RED
            </div>
            <div className={style.BLUE_DEFAULT}>
                BLUE
            </div>
            <div className={style.YELLOW_DEFAULT}>
                YELLOW
            </div>
            <button onClick={()=>STARTGAME()}>
                LIGAR
            </button>
        </main>
    </div>
  );
}

export default App;
