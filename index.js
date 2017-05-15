import {gameInit,gameStart} from './tetris'
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(20,20);


function init(){
    context.fillStyle='black';
    context.fillRect(0,0,24,40);
    context.font="0.8px Arial";
    context.fillStyle='white';
    context.fillText('press enter to continue...',1.6,10);
}
init();
gameInit();


let game=0;
document.addEventListener('keydown',event =>{
        if(event.keyCode === 13&&!game) {
            game=1;
            gameStart();
            init();
            game=0;
        }
    }
)