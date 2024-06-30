export default class Player2 extends Phaser.GameObjects.Sprite {

    
    constructor(scene, x, y, maxWidth) {
        super(scene, x, y, "playerrun2");
        scene.add.existing(this);
        this.initialPosition = x;
        this.floorHeight = y;
        this.setOrigin(0, 1); // Punto pivot in basso a sx
        this.setScale(0.5); // Scala le dimensioni del giocatore
        this.isJumping = false; // Di base il giocatore non sta saltando
        this.stepLength = 20; // Lunghezza del passo
        this.maxWidth = maxWidth;

        // RIFERIMENTI DEI TASTI
        this.cursorKeys = scene.input.keyboard.createCursorKeys();
        this.keySpace = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.KeyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.KeyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.KeyF = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.KeyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.initAnimations();
    }


    initAnimations() {
        // ANIMAZIONE DELLA CORSA
        this.anims.create({
            key: "playerMove", // Nome univoco dell'animazione
            frames: this.anims.generateFrameNumbers("playerrun2", {
                start: 1, // Frame di partenza
                end: 18, // Frame di arrivo
            }),
            frameRate: 25, // Velocità dell'animazione, numeri di frame al secondo
            repeat: -1 // Numeri di ripetizioni, il meno indica una ripetizione all'infinito
        });

        // ANIMAZIONE DI ROBIN FERMO
        this.anims.create({
            key: "playerStop", 
            frames: this.anims.generateFrameNumbers("playerrun2", {
                start: 0, 
                end: 0, 
            }),
            frameRate: 30, 
            repeat: -1 
        });
        this.anims.play("playerStop"); // Avvio dell'animazione di Robin fermo

        // ANIMAZIONE DEL SALTO
        this.anims.create({
            key: "playerJump",
            frames: this.anims.generateFrameNumbers("playerrun2", {
                start: 0, 
                end: 6, 
            }),
            frameRate: 30, 
        });

        // ANIMAZIONE DI ROBIN COLPITO
        this.anims.create({
            key: "playerHit",
            frames: this.anims.generateFrameNumbers("playerrun2", {
                start: 28, 
                end: 28, 
            }),
            frameRate: 15, 
        });

        // ANIMAIONE DI ROBIN CHE TIRA LA FRECCIA
        this.anims.create({
            key: "playerBow",
            frames: this.anims.generateFrameNumbers("playerrun2", {
                start: 33, 
                end: 36, 
            }),
            frameRate: 20, 
        });
    }
    

    manageAnimations() {
        const curr_anim = this.anims.currentAnim.key; // Nome dell'animazione corrente

        if (this.body.velocity.y !=0) {
            // Se mi sto muovendo in verticale, l'animazione è sempre playerJump
            if (curr_anim != "playerJump") {
                this.anims.play("playerJump");
            }
        } else if (this.body.velocity.x !=0) {
            // Se mi sto muovendo in orizzontale, l'animazione è playerMove
            if (curr_anim != "playerMove") {
                this.anims.play("playerMove");
            }
            // Configurazione del flip corretto
            this.flipX = this.body.velocity.x < 0;
        } else {
            // Se Robin è fermo, se non lo sto muovendo nè sulla x nè sulla y, Robin non si muove
            this.anims.play("playerStop");
        }
        if (this.KeyF.isDown) {
            // Se premo il tasto F, Robin tira la freccia
            this.anims.play("playerBow");
        }
    }


    manageMovements() {
        if(this.keysDisabled) {
            if (this.body.velocity.x >= 0) {
                this.keysDisabled = false;
                this.body.setAccelerationX(0);
            }
            return;
        }

        // Se premo il tasto A, Robin si gira a sinistra
        if (this.KeyA.isDown && this.x >= 0) {
            this.body.setVelocityX(-180); // Velocità dello spostamento verso sinistra
        // Se premo il tasto D, Robin si gira a destra
        } else if (this.KeyD.isDown && this.x <= this.maxWidth - this.displayWidth){
            this.body.setVelocityX(180); // Velocità dello spostamento verso destra
        } else {
        // Se non viene premuto alcun tasto, Robin resta fermo
            this.body.setVelocityX(0); // Indicazioni dei movimenti del personaggio rispetto alla x
        }
        // Se premo il tasto W, Robin salta
        if (this.KeyW.isDown && this.y >= this.displayHeight) {
            if (!this.isJumping) {
                this.isJumping = true;
                this.body.setVelocityY(-500);  // Velocità del salto 
            }
        }
        // La barra spaziatrice non viene premuta, quindi Robin non salta
        if (this.keySpace.isUp && this.y >= this.floorHeight) {
            this.isJumping = false;
        }

        this.manageAnimations();
    }


    disablekeys() {
        this.keysDisabled = true; // Di base, i tasti sono disabilitati
    }


    die() {
        this.player2.x = this.player2.initialPosition; // La morte di Robin consiste nel reset alla posizione iniziale del livello
    }

}