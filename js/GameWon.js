var GameWon = {
    preload: function() {

    },
    create: function() {
        game.add.text(16, 16, 'You WIN! Press space bar to play again', { fontSize: '32px', fill: '#ffff'});

        //register keys
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function() {
        if(this.spaceKey.isDown) {
            game.state.start('the-game');
        }
    }
}