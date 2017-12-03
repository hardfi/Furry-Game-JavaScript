document.addEventListener("DOMContentLoaded", function (event) {

// position of Furry on the board
var Furry = function() {
  this.x = 0;
  this.y = 0;
  this.direction = "right";
}

// random generator of coin position on the board
var Coin = function() {
  this.x = Math.floor(Math.random() * 10);
  this.y = Math.floor(Math.random() * 10);
}

// creating basic things
var Game = function() {
  this.board = document.querySelectorAll('#board div'); // this is an array
  this.furry = new Furry();
  this.coin = new Coin();
  this.score = 0;

  // inside functions that are inside this function this will have different context so we need to save the context we want to a variable
  var self = this;

  // function that changes output from x, y to number (0-99)
  this.getIndex = function(x, y) {
    return x + (y * 10);
  }

  // showing Furry on the board
  this.showFurry = function() {
    var furryPos = this.board[this.getIndex(this.furry.x, this.furry.y)]; // result: this.board[12] which is 13th div
    furryPos.classList.add('furry');
  }

  // throwing the coin to the board
  this.showCoin = function() {
    var coinPos = this.board[this.getIndex(this.coin.x, this.coin.y)];
    coinPos.classList.add('coin');
  }

  // hiding Furry from his last position
  this.hideVisibleFurry = function() {
    document.querySelector('.furry').classList.remove('furry');
  }

  // getting buttons being pressed
  document.addEventListener('keydown', function(event) {
    newGame.turnFurry(event); // event gives the number of button being pressed like '37';
  });

  // taking keyboard input and translating it into directions
  this.turnFurry = function(event) {
    switch (event.which) {
      case 37:
        this.furry.direction = 'left';
        break;
      case 38:
        this.furry.direction = 'up';
        break;
      case 39:
        this.furry.direction = 'right';
        break;
      case 40:
        this.furry.direction = 'down';
        break;
    }
  }

  // moving Furry around
  this.moveFurry = function() {

    // hide previous position of Furry
    this.hideVisibleFurry();

    // translating directions into actual Furry moves on axis
    if (this.furry.direction === 'right') {
      this.furry.x = this.furry.x + 1;
    } else if (this.furry.direction === 'left') {
      this.furry.x = this.furry.x - 1;
    } else if (this.furry.direction === 'down') {
      this.furry.y = this.furry.y + 1;
    } else {
      this.furry.y = this.furry.y - 1;
    }

    // check if it didn't get out of the board
    this.gameOver();

    // showFurry HAS TO be called here because dropping Furry on the board has to be executed every time interval set! and startGame function only calls this moveFurry function inside (not any other)
    this.showFurry();

    this.checkCoinCollision();
  }
  // hitting the wall (or just getting out of the board makes the game end)
  this.gameOver = function() {
    if (this.furry.x < 0  || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
      document.querySelector('#over').classList.remove('invisible');
      document.getElementById('final_score').innerHTML = (`Your final score is ${this.score}`);
      clearInterval(this.idSetInterval);

    }
  }

  // setting how fast Furry will move from one field to another and checking every time what the direction set is (and moving Furry this direction)
  this.startGame = function() {
    this.idSetInterval = setInterval(function() {
      self.moveFurry();
    }, 250);
  }

  // as the name suggests...
  this.checkCoinCollision = function() {
    var coinPos = document.querySelector('div.coin'),
        score = document.querySelector('#score strong');
    if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
      coinPos.classList.remove('coin');
      this.score++;
      score.innerHTML = this.score;
      this.coin = new Coin();
      this.showCoin();
    }
  }

} // here Game constructor ends


// ============= LAUNCHING THE GAME ============= //

// create an instance of an object Game to launch the game
var newGame = new Game();
// drop Furry to the board...
newGame.showFurry();
// drop the coin to the board...
newGame.showCoin();
// and then start animating Furry
newGame.startGame();




});
