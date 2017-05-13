/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var canvas = document.getElementById('tetris');
var context = canvas.getContext('2d');
//context.scale(20,20);
// ---------x
// |
// |
// |
// |
// y
var color = [null, '#F27557', '#84E9D8', '#DAFD79'];
var matrix_prototype = [[[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], [[1, 1], [1, 1]], [[0, 0, 0], [1, 1, 1], [0, 1, 0]], [[1, 0, 0], [1, 1, 1], [0, 0, 0]], [[0, 0, 1], [1, 1, 1], [0, 0, 0]], [[0, 1, 1], [1, 1, 0], [0, 0, 0]], [[1, 1, 0], [0, 1, 1], [0, 0, 0]]];

var x = [1, 0, -1, 0];
var y = [0, 1, 0, -1];
function initialVisit() {
    for (var ii = 0; ii < 20; ii++) {
        for (var jj = 0; jj < 12; jj++) {
            visit[ii][jj] = 0;
        }
    }
}
function clean() {
    outer: for (var i = 0; i < 20; i++) {
        var queue = [];
        for (var ii = 0; ii < 20; ii++) {
            for (var jj = 0; jj < 12; jj++) {
                bfs[ii][jj] = 0;
            }
        }if (!visit[i][0] && arena[i][0]) {
            var start = { x: 0, y: i };
            var now_color = arena[i][0];
            queue.push(start);
            while (queue.length != 0) {
                var front = queue[0];
                visit[front.y][front.x] = 1;
                bfs[front.y][front.x] = 1;
                queue.shift();
                for (var k = 0; k < 4; k++) {
                    var next_x = front.x + x[k];
                    var next_y = front.y + y[k];
                    if (next_x >= 0 && next_x < 12 && next_y >= 0 && next_y < 20) {
                        if (arena[next_y][next_x] === now_color && !visit[next_y][next_x]) {
                            var pos = { x: next_x, y: next_y };
                            queue.push(pos);
                        }
                    }
                }
            }
            //check whether it touchs right wall
            for (var _k = 0; _k < 20; _k++) {
                if (bfs[_k][11] === 1) {
                    for (var xx = 0; xx <= 11; xx++) {
                        for (var yy = 0; yy <= 19; yy++) {
                            if (bfs[yy][xx] === 1) {
                                arena[yy][xx] = 0;
                            }
                        }
                    }
                    for (var _yy = 0; _yy < 20; _yy++) {
                        for (var _xx = 0; _xx < 12; _xx++) {
                            bfs[_yy][_xx] = 0, visit[_yy][_xx] = 0;
                        }
                    }for (var _yy2 = 19; _yy2 >= 0; _yy2--) {
                        for (var _xx2 = 0, tt = 0; tt < 24; _xx2 = (_xx2 + 1) % 12, tt++) {

                            for (var yyy = 0; yyy < 20; yyy++) {
                                for (var xxx = 0; xxx < 12; xxx++) {
                                    bfs[yyy][xxx] = 0;
                                }
                            }if (!visit[_yy2][_xx2] && arena[_yy2][_xx2] != 0) {
                                var n_color = arena[_yy2][_xx2];
                                var q = [],
                                    st = { y: _yy2, x: _xx2 };
                                q.push(st);
                                while (q.length != 0) {
                                    var _front = q[0];
                                    visit[_front.y][_front.x] = 1;
                                    bfs[_front.y][_front.x] = arena[_front.y][_front.x];
                                    q.shift();
                                    for (var zz = 0; zz < 4; zz++) {
                                        var _next_x = _front.x + x[zz];
                                        var _next_y = _front.y + y[zz];
                                        if (_next_x >= 0 && _next_x < 12 && _next_y >= 0 && _next_y < 20) {
                                            if (arena[_next_y][_next_x] === n_color && !visit[_next_y][_next_x]) {
                                                var _pos = { x: _next_x, y: _next_y };
                                                q.push(_pos);
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

function copyBfs() {
    var cnt = 10000;
    var tem = bfs.map(function (arr) {
        return arr.slice();
    });
    for (var _x = 0; _x < 12; _x++) {
        var dis = 10000;
        var b = 0;
        for (var _y = 19; _y >= 0; _y--) {
            if (bfs[_y][_x] != 0) {
                for (var yy = _y + 1; yy <= 20; yy++) {
                    if (yy === 20) {
                        dis = yy - _y - 1;b = 1;break;
                    }
                    if (arena[yy][_x] != 0) {
                        dis = yy - _y - 1;b = 1;break;
                    }
                }
                if (b) break;
            }
        }
        cnt = Math.min(cnt, dis);
    }

    for (var i = 0; i < cnt; i++) {
        bfs.splice(19, 1);
        bfs.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    for (var _y2 = 0; _y2 < 20; _y2++) {
        for (var _x2 = 0; _x2 < 12; _x2++) {
            if (tem[_y2][_x2] != 0) {
                arena[_y2][_x2] = 0;
                visit[_y2][_x2] = 0;
            }
        }
    }
    for (var _y3 = 0; _y3 < 20; _y3++) {
        for (var _x3 = 0; _x3 < 12; _x3++) {
            if (bfs[_y3][_x3] != 0) {
                arena[_y3][_x3] = bfs[_y3][_x3];
                visit[_y3][_x3] = 1;
            }
        }
    }
}
function drawArena() {
    context.fillStyle = '#202028';
    context.fillRect(0, 0, 24, 40);
    for (var i = 0; i < arena.length; i++) {
        for (var j = 0; j < arena[i].length; j++) {
            if (arena[i][j] != 0) {
                context.beginPath();
                context.lineWidth = "0.1";
                context.strokeStyle = "black";
                context.rect(j, i, 1, 1);
                context.stroke();
                context.fillStyle = color[arena[i][j]];
                context.fillRect(j, i, 1, 1);
                /*
                context.font="1px Arial";
                context.fillStyle='black';
                context.fillText(`${arena[i][j]}`,j+0.2,i+0.85);
                */
            }
        }
    }
}
function drawMatrix(now_matrix) {
    var matrix = now_matrix.matrix;
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] != 0) {
                context.beginPath();
                context.lineWidth = "0.1";
                context.strokeStyle = "black";
                context.rect(j + now_matrix.offset.x, i + now_matrix.offset.y, 1, 1);
                context.stroke();
                context.fillStyle = color[matrix[i][j]];
                context.fillRect(j + now_matrix.offset.x, i + now_matrix.offset.y, 1, 1);
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
function playerFall() {
    while (1) {
        now_matrix.offset.y++;
        if (collide(arena, now_matrix)) {
            now_matrix.offset.y--;
            if (collide(arena, now_matrix)) {
                died = 1;return;
            }
            merge(arena, now_matrix);
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
        if (collide(arena, now_matrix)) {
            died = 1;return;
        }
        merge(arena, now_matrix);
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
    var m = now_matrix.matrix;
    var o = now_matrix.offset;
    for (var _y4 = 0; _y4 < m.length; ++_y4) {
        for (var _x4 = 0; _x4 < m[_y4].length; ++_x4) {
            if (m[_y4][_x4] !== 0 && (arena[_y4 + o.y] && arena[_y4 + o.y][_x4 + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}
function playerRotate(dir) {
    var tem = now_matrix.offset.x;
    var offset = 1;
    rotate(dir, now_matrix);
    while (collide(arena, now_matrix)) {
        now_matrix.offset.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > now_matrix.matrix[0].length) {
            rotate(-dir, now_matrix);
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
            rotate(-dir, now_matrix);
            now_matrix.offset.y = tem;
            return;
        }
    }
}
//////////
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 39) {
        //right
        playerMove(1);
    } else if (event.keyCode === 37) {
        playerMove(-1);
    } else if (event.keyCode === 40) {
        playerDrop();
    } else if (event.keyCode === 69) {
        playerRotate(1);
    } else if (event.keyCode === 81) {
        playerRotate(-1);
    } else if (event.keyCode === 32) {
        playerFall();
    }
});
function rotate(dir, now_matrix) {
    //dir==1 right dir=-1 left
    var matrix = now_matrix.matrix;
    var tem = matrix.map(function (arr) {
        return arr.slice();
    });
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            tem[j][i] = matrix[i][j];
        }
    }
    if (dir === 1) {
        for (var _i = 0; _i < matrix.length; _i++) {
            for (var _j = 0; _j < Math.floor(matrix[_i].length / 2); _j++) {
                var _ref = [tem[_i][matrix[_i].length - _j - 1], tem[_i][_j]];
                tem[_i][_j] = _ref[0];
                tem[_i][matrix[_i].length - _j - 1] = _ref[1];
            }
        }
    } else {
        for (var _i2 = 0; _i2 < Math.floor(matrix.length / 2); _i2++) {
            for (var _j2 = 0; _j2 < matrix[_i2].length; _j2++) {
                var _ref2 = [tem[matrix.length - _i2 - 1][_j2], tem[_i2][_j2]];
                tem[_i2][_j2] = _ref2[0];
                tem[matrix.length - _i2 - 1][_j2] = _ref2[1];
            }
        }
    }
    now_matrix.matrix = tem;
}

function merge(arena, now_matrix) {
    var matrix = now_matrix.matrix;
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] != 0) {
                arena[i + now_matrix.offset.y][j + now_matrix.offset.x] = matrix[i][j];
            }
        }
    }
}
var died = void 0;
var now_matrix = void 0;
var count = void 0;
var arena = [],
    visit = [],
    bfs = [];

function gameStart() {
    //set arena
    died = 0;
    count = 0;
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 12; j++) {
            arena[i][j] = 0;
            visit[i][j] = 0;
            bfs[i][j] = 0;
        }
    }
    gameReset();
    update();
}

function gameReset() {
    now_matrix = {
        type: Math.floor(Math.random() * 7)
    };
    now_matrix.matrix = matrix_prototype[now_matrix.type];
    var abc = Math.floor(Math.random() * 2 + 1);
    for (var _y5 = 0; _y5 < now_matrix.matrix.length; _y5++) {
        for (var _x5 = 0; _x5 < now_matrix.matrix.length; _x5++) {
            if (now_matrix.matrix[_y5][_x5] != 0) {
                now_matrix.matrix[_y5][_x5] = abc;
            }
        }
    }

    var range = 11 - now_matrix.matrix.length;
    now_matrix.offset = { x: Math.floor(Math.random() * range), y: 0 };
}

function update() {
    count++;
    if (count == 40) {
        playerDrop();
        count = 0;
    }
    if (died === 1) return;
    drawArena();
    drawMatrix(now_matrix);
    window.requestAnimationFrame(update);
}
function gameInit() {
    for (var i = 0; i < 20; i++) {
        arena.push([]);
        visit.push([]);
        bfs.push([]);
        for (var j = 0; j < 12; j++) {
            arena[i].push(0);
            visit[i].push(0);
            bfs[i].push(0);
        }
    }
}
exports.gameInit = gameInit;
exports.gameStart = gameStart;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tetris = __webpack_require__(0);

var canvas = document.getElementById('tetris');
var context = canvas.getContext('2d');
context.scale(20, 20);

console.log(_tetris.gameStart);

function init() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, 24, 40);
    /*
        context.fillStyle='white';
        context.beginPath();
        context.lineWidth="0.1";
        context.strokeStyle="white";
        context.rect(0,0,10,10);
        context.stroke();
    */
    context.font = "0.8px Arial";
    context.fillStyle = 'white';
    context.fillText('press enter to continue...', 1.6, 10);
}
init();
(0, _tetris.gameInit)();

var game = 0;
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13 && !game) {
        game = 1;
        (0, _tetris.gameStart)();
        init();
        game = 0;
    }
});

/***/ })
/******/ ]);