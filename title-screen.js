class TitleScene extends Phaser.Scene {
    
    constructor() 
    {
        super({ key: 'TitleScene' });         
    }
    
    preload()
    {
        this.load.image('ocean', 'assets/images/ocean.jpg');
        this.load.audio('title-music', 'assets/music/titlescreen.mp3');
        this.load.audio('gamesong', 'assets/music/gamesong.mp3');

        
        this.timeToFlashText = 700;
    }

    create()
    {
        this.cursors = this.input.keyboard.createCursorKeys();        
        this.add.image(0, 0, 'ocean');
        
        this.music = this.sound.add('gamesong');
        this.music.volume = 0.3;
        this.music.play();
        
        let centerX = this.game.config.width / 2;
        
        this.titleText = this.add.text(centerX, 180, 'Mission Keep Oceans Clean', { font: '40px Phosphate', fill: '#FC0000' });
        this.titleText.setOrigin(0.5);       // Center Text
        
        this.clickStartText = this.add.text(centerX, this.game.config.height - 100, 'Click Anywhere or press Space to Start', { font: '16px Phosphate', fill: '#FC0000' });
        this.clickStartText.setOrigin(0.5);
        
        this.input.on('pointerdown', function (pointer) {
            this.startGame();
        }, this);
    }

    update(time, delta)
    {
        if (this.cursors.space.isDown) { 
            this.startGame();
        }
        
        this.timeToFlashText -= delta;
        
        if ( this.timeToFlashText < 0 ) {
            this.clickStartText.visible = !this.clickStartText.visible;
            this.timeToFlashText = 700;
        }
    }
        
    startGame()
    {
        this.scene.start("MainGameScene");
        this.music.stop();        
    }
}