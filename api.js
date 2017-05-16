const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
let board=[];
router.get('/getboard', (req, res) => {
  res.json(board);
});
router.post('/board', (req, res) => {
  console.log(req.body);
  board.push(req.body);
  for(let i=board.length-1;i>0;i--){
      if(board[i].score>board[i-1].score){
          [board[i],board[i-1]]=[board[i-1],board[i]];
      }
  }
  if(board.length>=6){
      board.splice(5,1);
  }
  console.log(board);
});

module.exports = router;