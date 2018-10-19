// Global variable which can be accessed from anywhere
var lastGameScore = 0;

class GameOverScene extends Phaser.Scene {
    
    constructor() 
    {
        super({ key: 'GameOverScene' });         
    }
    
    preload()
    {
        this.load.image('ocean', 'assets/images/ocean.jpg');
    }

    create()
    {
        this.cursors = this.input.keyboard.createCursorKeys();        
        this.add.image(0, 0, 'ocean');
        
        let centerX = this.game.config.width / 2;
        
        let titleText = this.add.text(centerX, 130, 'GAME OVER', { font: '80px Phosphate', fill: '#FC0000' });
        titleText.setOrigin(0.5);       // Center Text

        let scoreLabel = this.add.text(centerX, 300, 'Score', { font: '24px Menlo', fill: '#fff' });
        scoreLabel.setOrigin(0.5);       // Center Text

        let scoreText = this.add.text(centerX, 350, lastGameScore, { font: '24px Menlo', fill: '#fff' });
        scoreText.setOrigin(0.5);       // Center Text
        
        let clickStartText = this.add.text(centerX, this.game.config.height - 100, 'Click Anywhere / Press Space to Reset', { font: '16px Phosphate', fill: '#FC0000' });
        clickStartText.setOrigin(0.5);
        
        this.input.on('pointerdown', function (pointer) {
            this.scene.start("TitleScene");
        }, this);
    }

    update(time, delta)
    {
        if ( this.cursors.space.isDown ) {
            this.scene.start("TitleScene");
        }   
    }
}