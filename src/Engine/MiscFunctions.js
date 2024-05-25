// Unrelated to any specific game functions.
// Used to aid other functions in small ways or aid in debugging.
class MiscFunctions{

    constructor() {}

    static removeQuotationsFromString(str) {
        let newStr = ""
        for (let i = 1; i < str.length - 1; i++) {
            newStr += str[i];
        }
        return newStr;
    }

    static consoleOutputEnemies() {
        for (let enemy of my.enemies) {
            console.log(enemy);
        }
    }

    static animStepCalculator(timestamp, frameDuration, maxFrames, initialStepIndex = 0){
        let totalStepsElapsed;
        let step;
        
        totalStepsElapsed = timestamp / frameDuration;
        step = totalStepsElapsed % maxFrames;
        step += initialStepIndex;

        return step;
    }
}

// Math-related functions used by other classes in this project
class Maths{

    constructor() {}

    static getRandomFloat(max, min = 0) {
        return Math.random() * (max - min) + min;
    }

    static getRandomInt(max, min = 0) {
        return Math.floor(this.getRandomFloat(max, min));;
    }
}