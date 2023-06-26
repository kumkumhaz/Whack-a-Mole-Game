let gamescore = document.getElementById('score');
let gametimer = document.getElementById('timer');
let startbtn = document.getElementById('start');
let pausebtn = document.getElementById('pause');
let squares = document.querySelectorAll('.square');
let grid = document.getElementsByClassName('grid')[0];

let score = 0;
let timeLeft = 60;
let moleposition = 0;
let gametimerid = null;
let randomMoleid = null;
// let gameMusic = new Audio("C:\Users\Kumkum\OneDrive\Desktop\FRONT END DEVELOPMENT\Projects\whake a mole game\images\gamemusic2.wav")
let gameMusic = new Audio('gamemusic2.wav');
let hitMoleMusic = new Audio('mousehit.wav');
let gameCompletedMusic = new Audio('gamecompleted.wav')


  
//mole will appear at random position
function randomMole(){
    squares.forEach(square =>{
        square.classList.remove('mole');
    })
    randomsquare = squares[Math.floor(Math.random()*squares.length)];
    randomsquare.classList.add('mole');
    moleposition = randomsquare.id;
}
randomMole();



// on click of mouse time left should decrease
function countdown(){
    if(timeLeft >0){
        timeLeft--;
        gametimer.innerHTML = `Time Left: ${timeLeft} s`;
        if(timeLeft > 0 && timeLeft <= 10){
            gametimer.style.color = 'red';
          }      
    }
    else{
        clearInterval(randomMoleid);
        clearInterval(gametimerid);
        grid.style.display = "none";
        gametimer.style.color = 'black';
        gametimer.style.fontSize = '20px';
        gamescore.style.fontSize = '20px'
        gameCompletedMusic.play();
    }
}


// onclick of mole score increases
squares.forEach(square =>{
    square.addEventListener('mousedown', ()=>{
      if(gametimerid !== null){
          if(square.id === moleposition){
           score++;
           hitMoleMusic.play();
           gamescore.innerHTML = `Your Score: ${score} `;
           moleposition = null;
        }
      }

    })
})


//start the game
function startGame(){
    score = 0;
    timeLeft = 60;
    grid.style.display = "flex";

    // callback function
  gametimerid=  setInterval(randomMole, 1000);
   randomMoleid = setInterval(countdown , 1000);
}

// pause and resume the game

function pauseGame(){
    if(pausebtn.innerHTML === 'Pause'){

        clearInterval(randomMoleid)
        clearInterval(gametimerid)
        pausebtn.innerHTML = 'Resume';
    }else{
        gametimerid=  setInterval(randomMole, 1000);
        randomMoleid = setInterval(countdown , 1000);
        pausebtn.innerHTML = 'Pause';
    }
}
pausebtn.addEventListener('click', pauseGame);
startbtn.addEventListener('click', startGame);