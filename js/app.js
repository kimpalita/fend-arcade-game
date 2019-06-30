// Enemies our player must avoid
class Enemy {
  constructor() {
    //Variables applied to each of our instances go here,
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.rows = [83, 166, 249]
    this.y = this.rows[Math.floor(Math.random() * this.rows.length)];;
    this.speed = Math.max(80, Math.floor(Math.random() * 300));
  }

  update(dt) {
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
  }

  render() {
    // Draw the enemy on the screen, required method for game
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

}

//var enemyInterval = window.setInterval(createEnemy, 2000);


function createEnemy() {
  let newEnemy = new Enemy();
  allEnemies.push(newEnemy);
}

let enemyGenerator = function enemyGen (callback, initialDelay) {

  let internalCallback = (function() {
    return function() {
      let nextDelay = Math.max(800, Math.floor(Math.random() * 2000));
      window.setTimeout(internalCallback, nextDelay);
      callback(); //createEnemy callback
    }
  }());

  window.setTimeout(internalCallback, initialDelay)
}

enemyGenerator(createEnemy, 300);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.sprite = 'images/char-cat-girl.png';
    this.startX = 202; //101 * 2
    this.startY = 332; //83 * 4
    this.x = this.startX;
    this.y = this.startY;
    this.hasWon = false;
  }

  update(axis, value) {
    this[axis] = this[axis] + value;
    if (this.y === 0 && !this.hasWon) {
      this.hasWon = true;
      this.winGame();
    }
  }

  winGame() {
    //check if won
    console.log("You've won!");
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(command) {
    switch (command) {
      case 'left':
        if (!this.x == 0) {
          this.update('x', -101);
        }
        break;
      case 'up':
        if (!this.y == 0) {
          this.update('y', -83);
        }
        break;
      case 'right':
        if (this.x < 101 * 4) {
          this.update('x', 101);
        }
        break;
      case 'down':
        if (this.y < 83 * 5) {
        this.update('y', 83);
        }
        break;
    }
  }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player();
let allEnemies = [];

// let enemy1 = new Enemy();
// allEnemies.push(enemy1);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    console.log('input detected');
    player.handleInput(allowedKeys[e.keyCode]);
});
