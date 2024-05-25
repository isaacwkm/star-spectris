class Level extends Phaser.Scene {
    constructor() {
        super("level");

        this.startingLevel = 1;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {

    }

    create() {
        console.log("S3 Level created");

        //      // Globals
        //
        //
        //

        my.enemyBp = new EnemyBlueprint(this, -100, -100);

        //      // Scene
        //
        //
        //

        const midX = my.settings.positions.MiddleOfScreenX;
        const midY = my.settings.positions.MiddleOfScreenY;
        this.background = this.add.tileSprite(midX, midY, 800, 600, "purple_background");

        //      // Player Model
        //
        //
        //

        my.players.playerShip = new Player(this);

        //      // Enemies
        //
        //
        //      
        
        

        //      // Projectiles
        //
        //
        //      

        // making player projectiles

        my.projectilesPlayer = {};
        for (let i = 0; i < my.settings.projectiles.maxPlayerBullets; i++){
            my.projectilesPlayer[i] = new Bullet(this, "spaceSprites1", "laserRed16.png", 12);
        }

        //      // Effects/Animations
        //
        //
        //    
        
        this.anims.create(my.anims.redLaserHit);
        this.anims.create(my.anims.blueLaserHit);
        this.anims.create(my.anims.greenLaserHit);

        //      // Text
        //
        //
        //

        new GameText(this);
        GameText.versionInfo(this);

        //      // Level Creation
        //
        //
        //

        my.enemyMan = new EnemyManager(this);
        my.level = new LevelManager(this, this.startingLevel);

    }

    update() {

        // Scrolling Background
        this.background.tilePositionY -= 1 * my.bgScrollSpeedMult;

        // Decrement all cooldown counters
        this.updateCooldowns();

        // Update player (movement, state, etc.)
        my.players.playerShip.update();

        // Update enemy manager
        my.enemyMan.update();

        // Update enemies
        this.updateEnemies();

        // Update bullets
        this.updateBullets();

        // Do something every second:
        this.doEverySecond();

        // Do something every tick:
        my.gameRuntime++;
        //console.log(my.level.enemyCount.alive);
    }

    doEverySecond(){
        let rt = my.gameRuntime;
        if (rt % 60 != 0){
            return;
        }
        else{
            //Do everhthing here
            rt = Math.floor(rt/60);
            console.log("doEverySecond(): " + "my.enemiesRowData: " + my.enemiesRowData + " time: " + rt);
        }
    }

    updateEnemies(){
        for (let enemy of my.enemies){
            if(enemy){
                enemy.update();
            }
        }
    }

    updateBullets(){
        for (let bullet in my.projectilesPlayer){
            my.projectilesPlayer[bullet].update();
        }
    }

    // updateCooldowns(): reducing cooldown count of all cooldowns (player, enemy, specials)
    updateCooldowns(){
        let entityObj = null;
        for (let entity in my.cooldowns){ // entity: player, enemy, etc.
            entityObj = my.cooldowns[entity];
            for (let cd in entityObj){ // cd: fire, shield, etc.
                entityObj[cd] -= 1;
            }
        }
    }

}