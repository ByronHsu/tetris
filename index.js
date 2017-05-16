import {gameInit,gameStart} from './tetris'
import {login} from './fb.js'
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
let board=[];
context.scale(20,20);



function init(){
    fetch(`/api/getboard`)
        .then(response => response.json())
        .then((res) => {
            board=res;
            return board
        })
        .then((b)=>{
            let i;
            for(i=1;i<=b.length;i++){
                //console.log('123123');
                context.fillText(`${b[i-1].name}  ${b[i-1].score}`,1.6,2*i);
            }
            context.fillText('press enter to continue...',1.6,2*i);
        })
    context.fillStyle='black';
    context.fillRect(0,0,24,40);
    context.font="0.8px Arial";
    context.fillStyle='white';
}

init();
gameInit();
document.addEventListener('keydown',event =>{
        if(event.keyCode === 13) {
            if(!login){
                alert('login first!!!');
            }
            else{
                gameStart();
                init();
            }
        }
    }
)