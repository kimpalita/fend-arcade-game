// Enemies our player must avoid
class Enemy {
  constructor(id) {
    this.id = id;
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.rows = [83, 166, 249];
    this.y = this.rows[Math.floor(Math.random() * this.rows.length)];
    this.speed = Math.max(80, Math.floor(Math.random() * 320));
    this.isVisible = true;
  }

  // Update the enemy's position
  // Parameter: dt, a time delta between ticks
  update(dt) {
    this.x += this.speed * dt;

    if (this.x > 505) {
      console.log("gone!");
      removeEnemy(this.id);
    }
  }

  // Draw the enemy on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

}

// Recursive function containing a setTimeout
// This generates new enemy instances at random intervals
let enemyGenerator = function enemyGen(callback, initialDelay) {
  let enemyID = 0;

  let internalCallback = (function() {
    return function() {
      let nextDelay = Math.max(1000, Math.floor(Math.random() * 2000));
      window.setTimeout(internalCallback, nextDelay);
      callback(enemyID); //createEnemy callback
      enemyID++;
    }
  }());

  window.setTimeout(internalCallback, initialDelay)
}

// Callback function called from enemyGenerator
// New enemy instances created here and pushed into allEnemies
let createEnemyCallback = function(id) {
  let newEnemy = new Enemy(id);
  allEnemies.push(newEnemy);
}

//Player class
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
    this[axis] += value;
    if (this.y === 0 && !this.hasWon) {
      this.hasWon = true;
      winGame();
    }
  }

  //Reset function to be called when collision occurs or the game has been won
  reset() {
    this.x = this.startX;
    this.y = this.startY;
    this.hasWon = false;
  }

  //draws player on canvas
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //handles input commands from keyboard
  //calls this.update() with associated axis and displacement
  handleInput(command) {
    if (!this.hasWon) {
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
}

// Instantiating objects.
enemyGenerator(createEnemyCallback, 300);
let player = new Player();
let allEnemies = [];

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  console.log(allowedKeys[e.keyCode]);
  player.handleInput(allowedKeys[e.keyCode]);
});


let checkCollisions = function checkCollision() {

  let collidedEnemy = allEnemies.find(function(enemy) {
    return enemy.y == player.y && enemy.x > player.x - 60 && enemy.x < player.x + 50;
  });

  if (collidedEnemy) {
    player.reset();
  }
};

//function to filter enemy array by removing enemies that have moved off canvas
function removeEnemy(id) {
  allEnemies = allEnemies.filter(function(enemy) {
    return enemy.id !== id;
  });
};

//when game has won, add congratulatory text and a reset game button
//remove newly created elements, when button is clicked
function winGame() {
  let congrats = document.createElement('p');
  congrats.id = 'congrats';
  congrats.textContent = 'Congrats! You\'ve made it the safe zone.';
  document.body.prepend(congrats);

  let resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset game';
  resetBtn.className = 'btn-reset';
  document.body.appendChild(resetBtn);
  console.log('You\'ve won!');

  document.querySelector('.btn-reset').addEventListener('click', function() {
    this.remove();
    congrats.remove();
    player.reset();
  });
}
