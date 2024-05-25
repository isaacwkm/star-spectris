class Player extends Phaser.GameObjects.Sprite {

    // x,y - starting sprite location
    // spriteKey - key for the sprite image asset
    // leftKey - key for moving left
    // rightKey - key for moving right
    constructor(scene, x = my.settings.positions.MiddleOfScreenX, y = my.settings.positions.PlayerShipYAxis, texture = "spaceSprites1", frame = "playerShip1_red.png") {
        super(scene, x, y, texture, frame);

        this.leftKey = scene.input.keyboard.addKey(my.settings.keybindings.moveLeft);
        this.rightKey = scene.input.keyboard.addKey(my.settings.keybindings.moveRight);
        this.fireKey = scene.input.keyboard.addKey(my.settings.keybindings.fire);

        this.playerSpeed = my.settings.movement.playerSpeed;
        this.bulletDamage = 10;

        this.moveBoundLeft = (this.displayWidth/2);
        this.moveBoundRight = (game.config.width - (this.displayWidth/2));
        
        this.setScale(0.5);
        scene.add.existing(this);

        return this;
    }

    update() {
        this.updatePollingMovement();
        this.updatePollingFire();
    }

        // updatePollingMovement(): polling for movement
        updatePollingMovement(){
            // Move left
            if ((this.leftKey.isDown) && this.x > this.moveBoundLeft) {
                for(let property in my.players){
                    my.players[property].x -= this.playerSpeed;
                }
            }
            // Move right
            if ((this.rightKey.isDown) && this.x < this.moveBoundRight) {
                for(let property in my.players){
                    my.players[property].x += this.playerSpeed;
                }
            }
        }
    
        // updatePollingFire(): polling for firing lasers
        updatePollingFire(){
            if (my.cooldowns.player.fire < 0 && (this.fireKey.isDown) && my.flags.firingAllowed == true) {
                this.fireBullet();
            }
        }

        fireBullet(){
            for(let bullet in my.projectilesPlayer){
                let b = my.projectilesPlayer[bullet];
                if (my.cooldowns.player.fire < 0 && b.active == false){
                    b.x = this.x;
                    b.y = this.y - 30;

                    b.makeActive();
                    b.setDamage(this.bulletDamage);
                    my.cooldowns.player.fire = 6; // Shot cooldown
                }
            }
        }

}