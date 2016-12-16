var TheGame = {
    preload: function() {
        game.load.image('sky','assets/sky.png');
        game.load.image('ground','assets/platform.png');
        game.load.image('star','assets/star.png');
        game.load.spritesheet('dude','assets/dude.png',32,48);
    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.sprite(0,0,'sky');

        platforms = game.add.group();
        platforms.enableBody = true;
        
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2,2);
        ground.body.immovable = true;
        
        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        player = game.add.sprite(32, game.world.height - 150, 'dude');

        game.physics.arcade.enable(player);

        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        player.animations.add('left',[0,1,2,3], 10, true);
        player.animations.add('right',[5,6,7,8], 10, true);
        player.frame = 4;

        stars = game.add.group();

        stars.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++)
        {
            //  Create a star inside of the 'stars' group
            var star = stars.create(i * 70, 0, 'star');

            //  Let gravity do its thing
            star.body.gravity.y = 160;

            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000'});
    },
    update: function() {
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(stars, platforms);
        game.physics.arcade.overlap(player, stars, collectStar, null, this);
        cursors = game.input.keyboard.createCursorKeys();

        player.body.velocity.x = 0;

        if(cursors.left.isDown) {
            // Move left
            player.body.velocity.x = -150;
            player.animations.play('left');
        }
        else if(cursors.right.isDown) {
            // Move right
            player.body.velocity.x = 150;
            player.animations.play('right');
        }
        else  {
            //stand still
            player.animations.stop();
            player.frame = 4;
        }

        // allow player to jump when on ground
        if(cursors.up.isDown && player.body.touching.down && hitPlatform) {
            player.body.velocity.y = -350;
        }
    }
}

function collectStar(player, star) {
    star.kill();

    score += 10;
    scoreText.text = 'Score: ' + score;

    //level complete if no start left
    if(stars.countLiving() <= 0) {
        levelComplete();
    }
}

function levelComplete() {
    game.state.start('game-won');
}