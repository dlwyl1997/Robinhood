export default class Enemy extends Phaser.GameObjects.Sprite {

    
    constructor(scene, x, y, maxWidth) {
        super(scene, x, y, "enemyrun");
        scene.add.existing(this);
        this.initialPosition = x;
        this.floorHeight = y;
        this.setOrigin(0, 1); 
        this.setScale(0.5); 
        this.stepLength = 3;
        this.maxWidth = maxWidth;
        
        this.initAnimations();
    }


    initAnimations() {
        this.anims.create({
            key: "enemyMove", 
            frames: this.anims.generateFrameNumbers("enemyrun", {
                start: 1, 
                end: 23, 
            }),
            frameRate: 20, 
            repeat: -1 
        });
        this.anims.play("enemyMove"); 
    }

    
    initPhysics() {
        this.body.setVelocityX(50);
        this.body.setImmovable(true);
        this.body.allowGravity = false;
    }


    manageAnimations() {
        const curr_anim = this.anims.currentAnim.key; 

        if (this.body.velocity.x !=0) {
            if (curr_anim != "enemyMove") {
                this.anims.play("enemyMove");
            }
            this.flipX = this.body.velocity.x < 0;
        } 
    }


    manageMovements() {
        // La guardia si muove in loop avanti e indietro rispetto a delle coordinate definite
        if(this.body.x > this.initialPosition + 100) {
            this.body.setVelocityX(-50);
        } else if(this.body.x < this.initialPosition - 100) {
            this.body.setVelocityX(50);
        }

        this.manageAnimations();
    }
}