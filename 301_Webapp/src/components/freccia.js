export default class Freccia extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, stepLength, goingRight) {
		super(scene, x, y, "freccia");
        scene.add.existing(this);
        this.initialX = x;
        this.goingRight = goingRight;
        this.stepLength = stepLength;
        this.floorHeight = y;
        this.setScale(0.4);   
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
    }

    fire() {
        if (this.goingRight) {
            this.body.setVelocityX(-500);
        } else {
            this.body.setVelocityX(500);
        }
    }

}