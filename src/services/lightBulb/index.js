

export default function LightBuild({RED,GREEN,BLUE,YELLOW}){

    function setTime(ref_, color, time, isAcess) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                ref_.current.style.backgroundColor = color;
                if(isAcess) {
                    ref_.current.style.border = `solid ${color} 20px`;
                }else {
                    ref_.current.style.border = 'solid black 20px';
                }
                resolve(true);
            }, [time]);
        });
    }

    return async function execute(color) {
        switch (color) {
            case 'RED':
                await setTime(RED, '#ff0000', 1200, true);
                await setTime(RED, '#ff4848', 410, false);
                break;
            case 'GREEN':
                await setTime(GREEN, '#00ff00', 1200, true);
                await setTime(GREEN, '#43d243', 410, false);
                break;
            case 'BLUE':
                await setTime(BLUE, 'blue', 1200, true);
                await setTime(BLUE, '#3b3bef', 410, false);
                break;
            case 'YELLOW':
                await setTime(YELLOW, 'yellow', 1200, true);
                await setTime(YELLOW, '#c0c067', 410, false);
                break;
            default:
        }
    }
}