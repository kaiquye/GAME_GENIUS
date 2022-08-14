import style from './App.module.css'
import {useState, useRef} from "react";
function App() {
    const [lightRED, setLightRED] = useState(false)
    const [lightGREEN, setLightGREEN] = useState(false)
    const [lightBLUE, setLightBLUE] = useState(false)
    const [lightYELLOW, setLightYELLOW] = useState(false)

    const GREEN = useRef()
    const RED = useRef()
    const BLUE = useRef()
    const YELLOW = useRef()

    const COLOR = ['RED', 'BLUE', 'GREEN', 'YELLOW']

    const [currentOrder, setCurrentOrder] = useState([])
    const [userOrder, setUserOrder] = useState([])

    const lightOf = (color) => {
        return { 'background-color': color}
    }

    const lightOn = (color) =>{
       return {'background-color': color}
    }

    function genereteTime (limit) {
        return (Math.floor(Math.random() * limit));
    }

    function setTime (ref_, color,time) {
      return new Promise((resolve, reject)=>{
          setTimeout(()=>{
              ref_.current.style.backgroundColor = color
              resolve(true)
          },[time])
      })
    }

    async function execute(color) {
        switch(color){
            case 'RED':
                await setTime(GREEN, 'white',2000)
                await setTime(GREEN, 'green',200)
        }
    }

    async function STARTGAME(){
      let order = []
      let green = 0;
      let runtime = genereteTime(10);
        setLightGREEN(true)
      while (runtime >= 0){
          console.log('iniciou')
          const randomNumber = Math.floor(Math.random() * COLOR.length);
            const currentColor = COLOR[randomNumber];
            order.push(currentColor);
            runtime -= 1;
           await execute(currentColor)
          //   await setTime(div_green, 'green',2000)
          // await setTime(div_green, 'white',2000)
      }
       setCurrentOrder(order)
       console.log(order)
    }

  return (
    <div className="App">
        <main style={lightGREEN === true ? lightOn('green') : lightOf('')} >
            <div ref={GREEN}  className={style.GREEN_DEFAULT}>
                GREEN
            </div>
            <div style={lightRED === true ? lightOn('red') : lightOf('')} className={style.RED_DEFAULT}>
                RED
            </div>
            <div className={style.BLUE_DEFAULT}>
                BLUE
            </div>
            <div className={style.YELLOW_DEFAULT}>
                YELLOW
            </div>
            <button onClick={async()=> await STARTGAME()}>
                LIGAR
            </button>
        </main>
    </div>
  );
}

export default App;
