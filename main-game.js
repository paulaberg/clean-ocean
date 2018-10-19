const playerShipSpeed = 220;

class MainGameScene extends Phaser.Scene {
    
    
    
    constructor() 
    {
        super({key: "MainGameScene"}); 
    }
    
    
    
    
    
    
    preload()
    {
        this.load.image('player-ship', 'assets/images/player-ship.png');
        this.load.image('under-water', 'assets/images/under-water.jpg');
        this.load.image('plastic-bag', 'assets/images/plastic-bag.png');
        this.load.image('soda', 'assets/images/soda.png');
        this.load.image('banana', 'assets/images/banana.png');
        this.load.image('crab-bullet', 'assets/images/crab-bullet.png')
        this.load.image('star-bullet', 'assets/images/star-bullet.png')
        
        
        this.load.audio('introsong', 'assets/music/introsong.mp3')
        
    }

    
    
    
    
    
    create()
    {
        this.cursors = this.input.keyboard.createCursorKeys();            
        this.asteroidGroup = this.add.group();
        this.bulletGroup = this.add.group();

        this.add.image(0, 0, 'under-water');
        this.createPlayerShip();
        this.createAsteroid();         
        
        this.music = this.sound.add('introsong');
        this.music.play();
        this.music.volume = 0.5;
        this.music.loop = true;
        
        this.asteroidTimer = 3000;
        this.bulletTimer = 300;
        
        var textStyle = {font: "16px Menlo", fill: "#ffffff", align: "center"}

    this.scoreTitle = this.add.text(60, 30, "TRASH SCORE", textStyle);
        this.scoreTitle.fixedToCamera = true;
        this.scoreTitle.setOrigin(0.5, 0.5);

    this.scoreValue = this.add.text(60, 60, "0", textStyle);
        this.scoreValue.fixedToCamera = true;
        this.scoreValue.setOrigin(0.5, 0.5);
        
    this.playerScore = 0; 
        
        
        var textStyle = {font: "16px Menlo", fill: "#ffffff", align: "center"}

        this.playerLives = 3;     

        this.livesTitle = this.add.text(this.game.config.width - 50, 30, "LIVES",   textStyle);
        this.livesTitle.fixedToCamera = true;
        this.livesTitle.setOrigin(0.5, 0.5);

        this.livesValue = this.add.text(this.game.config.width - 50, 60, this.playerLives, textStyle);
        this.livesValue.fixedToCamera = true;
        this.livesValue.setOrigin(0.5, 0.5);   
        
        
    }

    
    
    
    
    
    update(time, delta)
    { 
        //Player Ship
        if (this.cursors.right.isDown) {
            this.playerShip.setVelocityX(playerShipSpeed);
        }
        else if (this.cursors.left.isDown){
            this.playerShip.setVelocityX(-playerShipSpeed);
        } else {
            this.playerShip.setVelocityX(0);
        }
        
        
        if (this.cursors.up.isDown) {
            this.playerShip.setVelocityY(-playerShipSpeed);
        }
        else if (this.cursors.down.isDown) {
            this.playerShip.setVelocityY(playerShipSpeed);
        } else {
            this.playerShip.setVelocityY(0);
        }
        
        this.physics.overlap(this.asteroidGroup, this.playerShip, this.onAsteroidPlayerCollision, null, this); 
        
        
        //Asteroid    
        this.asteroidTimer -= delta;
        if ( this.asteroidTimer < 0 ) {
                this.createAsteroid();
        this.asteroidTimer = 3000;
        }
        
        if (this.cursors.space.isDown) {
            if (this.bulletTimer < 0) { 
            this.fireBullet(); this.bulletTimer=300}
            
        }  
        
        // Bullet
	       this.physics.overlap(this.asteroidGroup, this.bulletGroup, this.onAsteroidBulletCollision, null, this);
        this.bulletTimer -= delta ;
    }

    onAsteroidBulletCollision(asteroid, bullet) {
	        asteroid.destroy();
	        bullet.destroy();
        
            this.playerScore += 10;        
            this.scoreValue.setText(this.playerScore);
    
        
    }
    
    onAsteroidPlayerCollision(asteroid, player) {
    asteroid.destroy();
    this.playerLives -= 1;
    this.livesValue.setText(this.playerLives);

    if ( this.playerLives <= 0 ) {
        lastGameScore = this.playerScore;
        this.scene.start("GameOverScene");        
    }
    }
    
    
    
    
    
    
    
    createPlayerShip()
    {
        let startX = game.config.width / 1;
        let startY = game.config.height - 50;
        
        this.playerShip = this.physics.add.image(startX, startY, 'player-ship');   
        this.playerShip.setImmovable();
    
        this.playerShip.setCollideWorldBounds(true); 
    
    }
    
    
    
    
    
    
    createAsteroid() 
    {
        let graphic = "plastic-bag"
        
        let randomNumber = Phaser.Math.RND.between(1, 6);
        if (randomNumber == 2)
            graphic = "soda"
        else if (randomNumber == 3)
            graphic = "banana"
        
        let randomX = Phaser.Math.RND.between(0, 560);
        let asteroid = this.physics.add.image(randomX, 0, graphic);
        
        asteroid.setVelocity(0, 200);
    
        
        this.asteroidGroup.add(asteroid);
    }    
    
    
    
    
    
    
    
    
    fireBullet() 
    {
        let x = this.playerShip.x;
        let y = this.playerShip.y;

        let bullet = this.physics.add.image(x, y, 'star-bullet');
            bullet.setVelocity(0, -150);
        
        this.bulletGroup.add(bullet);
    }   

}