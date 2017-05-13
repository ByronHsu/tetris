const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(20,20);
// ---------x
// |
// |
// |
// |
// y
let color = [
    null,
    '#F27557',
    '#84E9D8',
    '#DAFD79',
]
let matrix_prototype =[
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
    ],
    [
        [1,1],
        [1,1]
    ],
    [
        [0,0,0],
        [1,1,1],
        [0,1,0],
    ],
    [
        [1,0,0],
        [1,1,1],
        [0,0,0],
    ],
    [
        [0,0,1],
        [1,1,1],
        [0,0,0],
    ],
    [
        [0,1,1],
        [1,1,0],
        [0,0,0],
    ],
    [
        [1,1,0],
        [0,1,1],
        [0,0,0],
    ]
]

let x=[1,0,-1,0];
let y=[0,1,0,-1];
function initialVisit(){
    for(let ii=0;ii<20;ii++) 
        for(let jj=0;jj<12;jj++)
            visit[ii][jj]=0;
}
function clean(){
    outer:
        for(let i=0;i<20;i++){
            let queue=[];
            for(let ii=0;ii<20;ii++) 
                for(let jj=0;jj<12;jj++)
                    bfs[ii][jj]=0;

            if(!visit[i][0]&&arena[i][0]){
                let start={x:0,y:i};
                let now_color=arena[i][0];
                queue.push(start);
                while(queue.length!=0){
                    let front=queue[0];
                    visit[front.y][front.x]=1;
                    bfs[front.y][front.x]=1;
                    queue.shift();
                    for(let k=0;k<4;k++){
                        let next_x=front.x+x[k];
                        let next_y=front.y+y[k];
                        if(next_x>=0&&next_x<12&&next_y>=0&&next_y<20){
                            if(arena[next_y][next_x]===now_color&&!visit[next_y][next_x]){
                                let pos={x:next_x,y:next_y};
                                queue.push(pos);
                            }
                        }
                    }
                }
                console.log('hi')
                //check whether it touchs right wall
                for(let k=0;k<20;k++){
                    if(bfs[k][11]===1){
                        for(let xx=0;xx<=11;xx++){
                            for(let yy=0;yy<=19;yy++){
                                if(bfs[yy][xx]===1){
                                    arena[yy][xx]=0;
                                }
                            }
                        }
                        for(let yy=0;yy<20;yy++) 
                            for(let xx=0;xx<12;xx++)
                                bfs[yy][xx]=0,visit[yy][xx]=0;
                        for(let yy=19;yy>=0;yy--){
                            for(let xx=0;xx<12;xx++){

                                for(let yyy=0;yyy<20;yyy++) 
                                    for(let xxx=0;xxx<12;xxx++)
                                        bfs[yyy][xxx]=0;

                                if(!visit[yy][xx]&&arena[yy][xx]!=0){
                                    let n_color=arena[yy][xx];
                                    let q=[],st={y:yy,x:xx};
                                    q.push(st);
                                    while(q.length!=0){
                                        let front=q[0];
                                        visit[front.y][front.x]=1;
                                        bfs[front.y][front.x]=arena[front.y][front.x];
                                        q.shift();
                                        for(let zz=0;zz<4;zz++){
                                            let next_x=front.x+x[zz];
                                            let next_y=front.y+y[zz];
                                            if(next_x>=0&&next_x<12&&next_y>=0&&next_y<20){
                                                if(arena[next_y][next_x]===n_color&&!visit[next_y][next_x]){
                                                    let pos={x:next_x,y:next_y};
                                                    q.push(pos);
                                                }
                                            }
                                        }
                                    }
                                    copyBfs();
                                    drawArena();
                                }
                            }
                        }
                        initialVisit();
                        continue outer;
                    }
                }
            }
        }
}

function copyBfs(){
    let cnt=10000;
    let tem = bfs.map( (arr) => {
        return arr.slice();
    });
    for(let x=0;x<12;x++){
        let dis=10000;
        let b=0;
        for(let y=19;y>=0;y--){
            if(bfs[y][x]!=0){
                for(let yy=y+1;yy<=20;yy++){
                    if(yy===20){
                        dis=yy-y-1;b=1;break;
                    }
                    if(arena[yy][x]!=0){
                        dis=yy-y-1;b=1;break;
                    }
                }
                if(b)
                    break;
            }
        }
        cnt=Math.min(cnt,dis);
    }

    for(let i=0;i<cnt;i++){
        bfs.splice(19,1);
        bfs.unshift([0,0,0,0,0,0,0,0,0,0,0,0]);
    }
    console.log('1');
    for(let y=0;y<20;y++){
        for(let x=0;x<12;x++){
            if(tem[y][x]!=0){
                arena[y][x]=0;
                visit[y][x]=0;
            }
        }
    }
    console.log('1');
    for(let y=0;y<20;y++){
        for(let x=0;x<12;x++){
            if(bfs[y][x]!=0){
                arena[y][x]=bfs[y][x];
                visit[y][x]=1;
            }
        }
    }
    console.log('1');
}
function drawArena(){
    context.fillStyle='#202028';
    context.fillRect(0,0,24,40);
    for(let i=0;i<arena.length;i++){
        for(let j=0;j<arena[i].length;j++){
            if(arena[i][j]!=0){
                context.beginPath();
                context.lineWidth="0.1";
                context.strokeStyle="black";
                context.rect(j,i,1,1);
                context.stroke();
                context.fillStyle=color[arena[i][j]];
                context.fillRect(j,i,1,1);
                /*
                context.font="1px Arial";
                context.fillStyle='black';
                context.fillText(`${arena[i][j]}`,j+0.2,i+0.85);
                */
            }
        }
    }
}
function drawMatrix(now_matrix){
    let matrix = now_matrix.matrix;
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[i].length;j++){
            if(matrix[i][j]!=0){
                context.beginPath();
                context.lineWidth="0.1";
                context.strokeStyle="black";
                context.rect(j+now_matrix.offset.x,i+now_matrix.offset.y,1,1);
                context.stroke();
                context.fillStyle=color[matrix[i][j]];
                context.fillRect(j+now_matrix.offset.x,i+now_matrix.offset.y,1,1);
                /*
                context.font="1px Arial";
                context.fillStyle='black';
                context.fillText(`${matrix[i][j]}`,j+now_matrix.offset.x+0.2,i+now_matrix.offset.y+0.85);
                */
            }
        }
    }
}
///////////
function playerFall(){
    while(1){
        now_matrix.offset.y++;
        if (collide(arena, now_matrix)) {
            now_matrix.offset.y--;
            merge(arena,now_matrix);
            initialVisit();
            clean();
            gameReset();
            break;
        }
    }
    count = 0;
}
function playerDrop() {
    now_matrix.offset.y++;
    if (collide(arena, now_matrix)) {
        now_matrix.offset.y--;
        merge(arena,now_matrix);
        initialVisit();
        clean();
        gameReset();
    }
    count = 0;
}
function playerMove(dir) {
    now_matrix.offset.x += dir;
    if (collide(arena, now_matrix)) {
        now_matrix.offset.x -= dir;
    }
}
function collide(arena, now_matrix) {
    const m = now_matrix.matrix;
    const o = now_matrix.offset;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}
function playerRotate(dir) {
    const tem = now_matrix.offset.x;
    let offset = 1;
    rotate(dir,now_matrix);
    while (collide(arena, now_matrix)) {
        now_matrix.offset.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > now_matrix.matrix[0].length) {
            rotate( -dir,now_matrix);
            now_matrix.offset.x = tem;
            return;
        }
    }
    tem = now_matrix.offset.y;
    offset = 1;
    while (collide(arena, now_matrix)) {
        now_matrix.offset.y += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > now_matrix.matrix[0].length) {
            rotate( -dir,now_matrix);
            now_matrix.offset.y = tem;
            return;
        }
    }
}
//////////
document.addEventListener('keydown',event =>{
        if(event.keyCode === 39){//right
            playerMove(1);
        }else
        if(event.keyCode === 37){
            playerMove(-1);
        }else
        if(event.keyCode === 40){
            playerDrop();
        }else
        if(event.keyCode === 69){
            playerRotate(1);
        }else
        if(event.keyCode === 81){
            playerRotate(-1);
        }else
        if(event.keyCode === 32){
            playerFall();
        }
    }
);
function rotate(dir,now_matrix){
    //dir==1 right dir=-1 left
    let matrix = now_matrix.matrix;
    let tem = matrix.map( (arr) => {
        return arr.slice();
    });
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[i].length;j++){
            tem[j][i]=matrix[i][j];
        }
    }
    if(dir===1){
        for(let i=0;i<matrix.length;i++){
            for(let j=0;j<Math.floor(matrix[i].length/2);j++){
                [tem[i][j],tem[i][matrix[i].length-j-1]]=[tem[i][matrix[i].length-j-1],tem[i][j]];
            }
        }
    }else{
        for(let i=0;i<Math.floor(matrix.length/2);i++){
            for(let j=0;j<matrix[i].length;j++){
                [tem[i][j],tem[matrix.length-i-1][j]]=[tem[matrix.length-i-1][j],tem[i][j]];
            }
        }
    }
    now_matrix.matrix = tem;
}

function merge(arena,now_matrix){
    let matrix = now_matrix.matrix;
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[i].length;j++){
            if(matrix[i][j]!=0){
                arena[i+now_matrix.offset.y][j+now_matrix.offset.x]=matrix[i][j];
            }
        }
    }
}

let now_matrix;
let arena=[],visit=[],bfs=[];
function gameStart(){
    //set arena
    for(let i = 0; i < 20 ; i++) {
            arena.push([]);
            visit.push([]);
            bfs.push([]);
        for(let j=0; j<12; j++){
            arena[i].push(0);
            visit[i].push(0);
            bfs[i].push(0);
        }
    }
    gameReset();
}
let resetcnt=0;
function gameReset(){
    now_matrix={
        type:Math.floor(Math.random()*7),
    }
    now_matrix.matrix=matrix_prototype[now_matrix.type];
    let abc=Math.floor(Math.random()*2+1);
    for(let y=0;y<now_matrix.matrix.length;y++){
        for(let x=0;x<now_matrix.matrix.length;x++){
            if(now_matrix.matrix[y][x]!=0){
                now_matrix.matrix[y][x]=abc;
            }
        }
    }
    
    let range = 11-now_matrix.matrix.length;
    now_matrix.offset={x:Math.floor(Math.random()*range),y:0};
}
let count=0;
function update(){
    count++;
    if(count==40){
        playerDrop();
        count=0;
    }
    drawArena();
    drawMatrix(now_matrix);
    window.requestAnimationFrame(update); 
}
gameStart();
update();

