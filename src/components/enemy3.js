export default class Enemy3 extends Phaser.GameObjects.Sprite {
    

    constructor(scene, x, y, maxWidth) {
        super(scene, x, y, "enemy3run");
        scene.add.existing(this);
        this.initialPosition = x;
        this.floorHeight = y;
        this.setOrigin(0, 1);
        this.setScale(0.5); 
        this.stepLength = 3;
        this.maxWidth = maxWidth;
        this.hitten = false;
        this.Moving = true;

        this.initAnimations();
    }


    initAnimations() {
        this.anims.create({
            key: "enemyMove",
            frames: this.anims.generateFrameNumbers("enemy3run", {
                start: 0, 
                end: 17, 
            }),
            frameRate: 20, 
            repeat: -1 
        });

        this.anims.play("enemyMove"); 

        this.anims.create({
            key: "enemyHit",
            frames: this.anims.generateFrameNumbers("enemy3run", {
                start: 34, 
                end: 36, 
            }),
            frameRate: 20, 
        });
    }

    


    initPhysics() {
        this.body.setVelocityX(200);
        this.body.setImmovable(true);
        this.body.allowGravity = false;
    }


    manageAnimations() {
        const curr_anim = this.anims.currentAnim.key;

        if (this.Moving == false) {return;} // Se il principe non si sta muovendo non fai nessuna animazione 

        if (this.hitten) { // Gestione dell'animazione del principe colpito
            
            this.flipX = this.body.velocity.x < 0;
            this.anims.play("enemyHit");
            this.once('animatiocomplete', () =>{ // Quando finisce il tempo per l'animazione del principe colpito riprendi la camminata
                this.anims.playReverse("enemyMove")
                
            })
            this.hitten = false;
        } else {
            if (this.body.velocity.x !=0) {
            if (curr_anim != "enemyMove") {
                    this.anims.play("enemyMove");
                }
                this.flipX = this.body.velocity.x < 0;
            } 
        }
        
    }


    manageMovements() {
        if(this.body.x >= 1000) {
            this.body.setVelocityX(-150);
        } else if(this.body.x <= 50) {
            this.body.setVelocityX(200);
        }

        this.manageAnimations();
    }
}