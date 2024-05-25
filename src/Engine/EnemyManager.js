// Class that manages the active enemies on screen and keeps track of significant data
class EnemyManager {

    constructor(scene) {
        this.scene = scene;

        my.counters.currFirstEnemyIndex = 0;
        this.shiftStep = 0;

        this.maxShiftStep = 10;
        this.ticksPerStep = 1;

        this.timestamps = {
            shift: 0
        }
    }

    levelCleanup(){
        my.counters.currFirstEnemyIndex = 0;
    }

    update() {
        //console.log("LevelEditor.update()");

        this.updateShifting(my.gameRuntime);
    }

    // An update that only happens on enemy death.
    // Applicable update procedures should be placed here instead of update() to reduce processing cost.
    deathUpdate() {
        
        this.checkAndShiftRowsDown(my.gameRuntime);
    }

    updateShifting(runtime){

        if (my.queue.shifting[0] == null){
            return;
        }
        else if(this.shiftStep == this.maxShiftStep){
            this.finishShiftingDown();
        }
        else if(runtime == this.timestamps.shift + this.ticksPerStep){
            //console.log(this.timestamps.shift);
            this.shiftRowsDown(this.shiftStep, this.maxShiftStep);
            this.timestamps.shift += this.ticksPerStep;
        }
        else{

        }
    }

    checkAndShiftRowsDown(runtime) {
        //console.log("checkAndShiftRowsDown()");
        if (my.enemiesRowData[0] == 0){

            my.enemiesRowData.shift();

            if (my.level.checkStageCleared()){
                return;
            }

            const rowLen = my.settings.layout.columns;

            
            if (my.flags.stageStart == false){ // move the curr enemy index only if the stage is not starting
                //shift index up the array to the frontmost row
                my.counters.currFirstEnemyIndex += rowLen;
            }
            
            //reset variable
            this.shiftStep = 0;
            // decrement row
            this.decrRowProperties();
            // timestamp shift start so that it can control the period of the transition
            this.timestamps.shift = runtime;
            // shifting "flag" as long as there is one 'q' in the queue
            my.queue.shifting.push('q');

            // checking if initial stage animation of enemies moving forward finished
            my.counters.rowsShiftedThisLevel++;
            if (my.counters.rowsShiftedThisLevel == 4){
                my.counters.rowsShiftedThisLevel = 0;
                my.level.setStageStartFlag(false);
            }
            
            //perform first shift
            this.shiftRowsDown(this.shiftStep, this.maxShiftStep);
        }
    }

    finishShiftingDown(){
        //console.log("done shifting...")
        this.shiftStep = 0;
        this.applyRowEffects();
        this.timestamps.shift = -1;
        my.queue.shifting.shift();
        my.level.updateAfterShifting();
        this.checkAndShiftRowsDown(my.gameRuntime);
    }

    shiftRowsDown(step = 0, maxShiftStep){
        const rowLen = my.settings.layout.columns;
        this.shiftStep++;
        //console.log("shifting...");
        for (let i = 0; i < rowLen * 3; i++) {
            if (my.enemies[my.counters.currFirstEnemyIndex + i]) {
                my.enemies[my.counters.currFirstEnemyIndex + i].shiftRowDown(step, maxShiftStep);
            }
        }
    }

    decrRowProperties(){
        const rowLen = my.settings.layout.columns;
        let currEnemy;

        for (let i = 0; i < rowLen * 3; i++) {
            //console.log("decrRowProperties()");
            currEnemy = my.enemies[my.counters.currFirstEnemyIndex + i];
            if (currEnemy != null) {
                currEnemy.decrRowProperty();
            }
        }
    }

    applyRowEffects() {
        const rowLen = my.settings.layout.columns;
        let row = 0;
        let currEnemy;

        for (let i = 0; i < rowLen * 3; i++) {
            row = Math.ceil((i + 1) / 9);
            currEnemy = my.enemies[my.counters.currFirstEnemyIndex + i];

            if (currEnemy != null) {
                currEnemy.makeRowEffects(row);
            }
        }
    }
}