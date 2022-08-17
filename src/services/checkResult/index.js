export default function checkResult({StartGame, current_CPU_Order, current_USER_Order, color, fail}) {
    return function execute() {

        const novoArray =  current_USER_Order
        novoArray.push(color)

        const keysByUser = Object.values(novoArray).filter(value => value !== '');

        const a1 = JSON.stringify(keysByUser)
        const a2 = JSON.stringify(current_CPU_Order)

        if(current_CPU_Order.length === novoArray.length) {
            console.log('igual')
            if (a1 !== a2) {
                fail()
                setTimeout(()=>{
                    document.location.reload()
                },[2000])
                return false
            }else {
              return StartGame()
            }
        }
        return false

    }
}