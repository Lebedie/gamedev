// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var currentScore = 0;
var winningScore = 100;

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  createItem(325, 500, 'coin');
  createItem(175, 500, 'coin');
  createItem(225, 500, 'coin');
  createItem(375, 500, 'coin');
  createItem(525, 500, 'coin');
  createItem(575, 500, 'coin');
  createItem(175, 350, 'coin');
  createItem(225, 350, 'coin');
  createItem(375, 350, 'coin');
  createItem(325, 350, 'coin');
  createItem(380, 250, 'coin');
  createItem(325, 250,'coin');
  createItem(575, 250, 'coin');
  createItem(625, 250, 'coin');
  createItem(380, 150, 'coin');
  createItem(325, 150, 'coin');
  createItem(130, 150, 'star');
  createItem(110, 150, 'star');
  createItem(115, 150, 'star');
  createItem(105, 150, 'star');
  createItem(120, 150, 'star');
  createItem(125, 150, 'star');
  createItem(135, 150, 'star');
  createItem(145, 150, 'star');
  createItem(150, 150, 'star');
  createItem(155, 150, 'star');
  createItem(160, 150, 'star');
  createItem(165, 150, 'star');
  createItem(170, 150, 'star');
  createItem(175, 150, 'star');
  createItem(180, 150, 'star');
  createItem(185, 150, 'star');
  createItem(190, 150, 'star');
  createItem(195, 150, 'star');
  createItem(200, 150, 'star');
  createItem(205, 150, 'star');
  createItem(210, 150, 'star');
  createItem(215, 150, 'star');
  createItem(220, 150, 'star');
  createItem(225, 150, 'star');
  createItem(230, 150, 'star');
  createItem(235, 150, 'star');
  createItem(240, 150, 'star');
  createItem(245, 150, 'star');
  createItem(250, 150, 'star');
  createItem(255, 150, 'star');
  createItem(260, 150, 'star');
  createItem(265, 150, 'star');
  createItem(270, 150, 'star');
  createItem(230, 150, 'star');
  createItem(235, 150, 'star');
  createItem(600, 250, 'poison');
  createItem(350, 250, 'poison');
  createItem(250, 250, 'poison');
  createItem(400, 500, 'poison');
  createItem(250, 125, 'poison');
  createItem(265, 500, 'poison');
  createItem(270, 350, 'poison');
}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(100, 550, 'platform2');
  platforms.create(290, 550, 'platform2');
  platforms.create(480, 550, 'platform2');
  platforms.create(100, 410, 'platform2');
  platforms.create(290, 410, 'platform2');
  platforms.create(550, 300, 'platform2');
  platforms.create(300, 300, 'platform2');
  platforms.create(300, 200, 'platform2');
  platforms.create(100, 200, 'platform2');
  platforms.setAll('body.immovable', true);
}

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(100, 500, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  if (item.key === 'coin') {
     currentScore = currentScore + 10;
  } else if (item.key === 'poison') {
     currentScore = currentScore - 25;
  } else if (item.key === 'star') {
     currentScore = currentScore + 1000;
  }
    if (currentScore === winningScore) {
      createBadge();
  }
}

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#5db1ad';
    
    //Load images
    game.load.image('platform', 'platform_1.png');
    game.load.image('platform2', 'platform_2.png');
    
    //Load spritesheets
    game.load.spritesheet('player', 'chalkers.png', 48, 62);
    game.load.spritesheet('coin', 'coin.png', 36, 44);
    game.load.spritesheet('badge', 'badge.png', 42, 54);
    game.load.spritesheet('poison', 'poison.png', 32, 32);
    game.load.spritesheet('star', 'star.png', 32, 32);
  }

  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player winw the game
    if (won) {
      winningMessage.text = "YOU WIN!!!";
    }
  }

  function render() {

  }

};
