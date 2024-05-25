class EnemyOrange extends Enemy {

    // x,y - starting sprite location
    // spriteKey - key for the sprite image asset
    constructor(scene, x, y, identifier, rowOnScreen, texture = "spaceSprites1", frame = "enemyRed3.png") {
        let properties = {
            id: identifier, // unique identifier
            state: "dead", // alive, dying, dead
            health: 20,
            defense: 0,
            lifetime: 0, // tick counter to use in cycling behavior phases
            row: rowOnScreen, // Row on-screen. 1: front, 2: middle, 3: back, -1: offscreen
            dodge: 0, // bullet dodge chance
            baseDodge: 0, // used for reference when reverting buffs
            buffs: {}, // list of active buffs
            debuffs: {}, // list of active debuffs
            allyInFront: null, // link to the closest ally in front. null indicates it has no ally in front of it.
            allyBehind: null, // link to the closest ally in behind. null indicates it has no ally behind it.
            modeLifetime: 0, // how long the enemy has been in its current behavior mode.
            movementMode: "idle", // idle, strafing, re-entry, immobile
            shootMode: "idle", // idle, shooting, special, cooldown
            shootCooldown: 6, //seconds
        }
        super(scene, texture, frame, x, y, properties);

        return this;
    }
}