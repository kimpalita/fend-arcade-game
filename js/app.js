// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(keycode) {
    this.sprite = 'images/char-cat-girl.png';
    this.startX = 202; //101 * 2
    this.startY = 332; //83 * 4
    this.x = this.startX;
    this.y = this.startY;
  }

  update(axis, value) {
    this[axis] = this[axis] + value;
    //check if won
    if (this.y < 83) {
      winGame();
    }
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

function winGame() {
  console.log("You've won!")
};

let player = new Player();
