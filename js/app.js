// Enemy constructor function with our x & y & speed
// variables so we can create enemies with different
// parameters.
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y + 55;
    this.moveX = 101;
    this.resetPos = -101;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // If enemy is not past boundary, move & increment speed
    // by the dt parameter.
    if (this.x < this.moveX * 5) {
        this.x += this.speed * dt;
    }
    // Reset position to start.
    else {
        this.x = this.resetPos;
    }
};

// Draw the enemy on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Setting up our constructor function for our player.
class Boy {
    constructor() {
        this.moveY = 83;
        this.moveX = 101;
        this.startPosX = this.moveX * 2;
        this.startPosY = (this.moveY * 4) + 55;
        this.sprite = 'images/char-boy.png';
        this.x = this.startPosX;
        this.y = this.startPosY;
        this.won = false;
    }
    // Draw the player on screen.
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Setting up character movements & boundaries so our player 
    // stays on the game board.
    handleInput(input) {
        switch(input) {
            case 'up': 
            if (this.y > 0) {
                this.y -= this.moveY;
            }
            break;

            case 'down': 
            if (this.y < this.moveY * 4) {
                this.y += this.moveY;
            }
            break;

            case 'left': 
            if (this.x > 0) {
                this.x -= this.moveX;
            }
            break;

            case 'right': 
            if (this.x < this.moveX * 4) {
                this.x += this.moveX;
            }
            break;
        }
    }

    // Setting our reset position function.
    reset() {
        this.y = this.startPosY;
        this.x = this.startPosX;
    }

    update() {      
        // Check for a collision and if so, reset the player.
        for(let enemy of allEnemies) {
            if (this.y === enemy.y && (enemy.x + enemy.moveX/2 > this.x && enemy.x < this.x + this.moveX/2)) {
                this.reset();
            };
            // Or if not, you won!
            if (this.y === 55) {
                this.won = true;
            }
        }
    }
}

// Construct the player and each enemy at different positions & speeds.
// Instantiates our objects on the board.
const player = new Boy();
const bugOne = new Enemy(-101, 0, 80);
const bugTwo = new Enemy(-101, 83, 280);
const bugThree = new Enemy(-252, 83, 280);
const bugFour = new Enemy(-500, 166, 180);
const bugFive = new Enemy(-370, 0, 80);

// Create array for enemies and push each bug into array.
const allEnemies = [];
allEnemies.push(bugOne, bugTwo, bugThree, bugFour, bugFive);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
