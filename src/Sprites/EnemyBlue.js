class EnemyBlue extends Enemy {

    // x,y - starting sprite location
    // spriteKey - key for the sprite image asset
    constructor(scene, x, y, identifier, rowOnScreen, texture = "spaceSprites1", frame = "enemyBlue3.png") {
        let properties = {
            id: identifier, // unique identifier
            state: "dead", // alive, dying, dead
            health: 40,
            defense: 0, // damage mitigation rate (100 = 100% of damage blocked)
            lifetime: 0, // tick counter to use in cycling behavior phases
            row: rowOnScreen, // Row on-screen. 1: front, 2: middle, 3: back, -1: offscreen
            dodge: 0, // bullet dodge chance
            baseDodge: 0, // used for reference when reverting buffs
            buffs: {}, // list of active buffs
            debuffs: {}, // list of active debuffs
            allyInFront: null, // link to the closest ally in front. null indicates it has no ally in front of it.
            allyBehind: null, // link to the closest ally in behind. null indicates it has no ally behind it.
            phaseLifetime: 0, // how long the enemy has been in its current behavior mode.
            phase: "standby", // standby -> shielding -> repeat
            shootMode: "idle", // idle, shooting, special, cooldown
            shootCooldown: 3, //seconds
        }

        super(scene, texture, frame, x, y, properties);

        this.phaseTarget = 0;
        this.phases = ["standby", "shielding"]; // mostly for informational reference
        this.maxTargetOfPhase = [6, 6];

        return this;
    }

    update() {
        // Check for class-specific behavior phases:
        this.checkPhase();

        // Parent Enemy class update procedures
        super.update();
    }

    // Potential phases for this enemy: 
    // 
    checkPhase() {
        if (this.properties.phase == "shielding"){

        }
        else{

        }
    }
}