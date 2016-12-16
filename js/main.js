var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container');
var score = 0;
var scoreText;

game.state.add('the-game', TheGame);
game.state.add('game-won', GameWon);

game.state.start('the-game');

