// Preset text settings for all on-screen game text
class GameText {

    constructor(scene) {
        scene.text = {};
    }

    static versionInfo(scene) {
        const x = 525;
        const y = 0;

        scene.text.versionInfo = scene.add.bitmapText(x, y, "arcade", "Prototype Version", 16);

    }

    static addLoadingAnimText(scene, updating = false, frame = 0) {
        //console.log("GameText: animated text");
        const midX = my.settings.positions.MiddleOfScreenX;
        const midY = my.settings.positions.MiddleOfScreenY;
        let x = midX - 50;
        let y = midY + 50;
        let strDots = "";

        for (let i = 0; i < frame; i++) {
            strDots += ".";
        }

        if (updating == false) {
            scene.text.loadingAnim = scene.add.bitmapText(x, y, "arcade", "Loading" + strDots, 16);
        }
        else {
            scene.text.loadingAnim.setText("Loading" + strDots, 16);
        }

    }

    static addFancyTitleText(scene) {
        const x = 64;
        const y = 0;

        scene.text.fancyTitle = scene.add.bitmapText(x, y, 'ice', 'Star Spectris', 32);

        scene.text.fancyTitle.setBlendMode(Phaser.BlendModes.ADD);

        scene.tweens.add({
            targets: scene.text.fancyTitle,
            duration: 4000,
            scaleX: 3,
            ease: 'Quad.easeInOut',
            repeat: 0,
            yoyo: false
        });

        scene.tweens.add({
            targets: scene.text.fancyTitle,
            duration: 3000,
            scaleY: 6,
            ease: 'Cubic.easeInOut',
            repeat: 0,
            yoyo: false
        });
    }

    static addPressAnyKey(scene) {
        const x = 525;
        const y = 0;

        scene.text.versionInfo = scene.add.bitmapText(x, y, "arcade", "Prototype Version", 16);

    }

    static addInsertCoin(scene, updating = false, frame = 0) {
        //console.log("GameText: animated text");
        const midX = my.settings.positions.MiddleOfScreenX;
        const midY = my.settings.positions.MiddleOfScreenY;
        let x = midX - 85;
        let y = midY + 100;


        if (updating == false) {
            scene.text.insertCoin = scene.add.bitmapText(x, y, "arcade", "INSERT COIN", 16);
        }
        else {
            if (frame == 0){
                scene.text.insertCoin.setText("INSERT COIN", 16);
            }
            else{
                scene.text.insertCoin.setText("", 16);
            }
        }

    }

    static addMainMenuOptions(scene) {
        //console.log("GameText: animated text");
        const midX = my.settings.positions.MiddleOfScreenX;
        const midY = my.settings.positions.MiddleOfScreenY;
        let x = midX - 80;
        let y = midY - 60;
        let offset = 40;

        scene.selectionCursor = new Player(scene, x - 25, y + 8);
        scene.selectionCursor.setScale(0.2);
        scene.selectionCursor.angle = 90;

        scene.text.playOption = scene.add.bitmapText(x, y, "arcade", "PLAY", 16);

        scene.text.highScoresOption = scene.add.bitmapText(x, y + (offset * 1), "arcade", "HIGH SCORES", 16);

        scene.text.controlsOption = scene.add.bitmapText(x, y + (offset * 2), "arcade", "CONTROLS", 16);

        //scene.text.creditsOption =scene.add.bitmapText(x, y + (offset * 3), "arcade", "CREDITS", 16);

    }
}
