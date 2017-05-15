import {gameInit,gameStart} from './tetris'

let canvas = document.getElementById('tetris');
let context = canvas.getContext('2d');
context.scale(20,20);

console.log(gameStart);

function init(){
    context.fillStyle='black';
    context.fillRect(0,0,24,40);
/*
    context.fillStyle='white';
    context.beginPath();
    context.lineWidth="0.1";
    context.strokeStyle="white";
    context.rect(0,0,10,10);
    context.stroke();
*/
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