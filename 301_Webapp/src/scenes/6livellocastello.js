import Player2 from "../components/player2.js"
import Enemy3 from "../components/enemy3.js"
import Freccia from "../components/freccia.js"

export default class livellocastello extends Phaser.Scene{
    

    constructor() {
        super("livellocastello");
        this.sovrapposizione2_player_interazione2 = false;
    }


    init() { 
        console.log("livellocastello - Executing init()");
        this.floorHeight = this.game.config.height - 45;
        this.floorWidth = 1280; 
        this.worldWidth = 1280;
        this.lastFreccia = 0;
    }

    
    preload() {
        console.log("livellocastello - Executing preload()");
    }

    

    create() {
        console.log("livellocastello - Executing create()");
        
        // SFONDO
        this.background = this.add.tileSprite(0, 0, 1280, 720, "background2"); 
        this.background.setOrigin(0, 0); 

        // TERRENO
        this.floor = this.add.rectangle(0, this.game.config.height, this.worldWidth, this.game.config.height - this.floorHeight, 0xFFFFFF, 0);
        this.floor.setOrigin(0, 1);
        
        // FISICA - Terreno
        this.physics.add.existing(this.floor, true); 

        // PARETI
        this.parete1 = this.add.rectangle(-10, this.game.config.height, 50, this.game.config.height-10, 0xFFFFFF, 0);
        this.parete1.setOrigin(0, 1);
        this.parete2 = this.add.rectangle(1260, this.game.config.height + 1260, 1290, this.game.config.height + 1290, 0xFFFFFF, 0);
        this.parete2.setOrigin(0, 1);

        // FISICA - Pareti
        this.physics.add.existing(this.parete1, true);
        this.physics.add.existing(this.parete2, true);

        // COLONNE
        this.colonna1 = this.add.image(300, 530, "colonna1"); 
        this.colonna2 = this.add.image(980, 530, "colonna2");
        
        // LAMPADARIO
        this.lampadario = this.add.image(640, 180, "lampadario"); 
       
        // BARRAVITA ROBIN
        for (let i = 0; i<=3; i++) {
            this.anims.create({
                key: "barravita" + i, 
                frames: this.anims.generateFrameNumbers("barravita", {
                    start: i, 
                    end: i,
                })
            });
        }
        this.barravita = this.add.sprite(10, 10, "barravita");
        this.barravita.setOrigin (0,0);
        this.barravita.setScale (0.8);
        this.barravita.setScrollFactor(0, 0);
        this.barravita.anims.play("barravita0");

        // BARRAVITA PRINCIPE
        for (let i = 0; i<=3; i++) {
            this.anims.create({
                key: "barraprincipe" + i, 
                frames: this.anims.generateFrameNumbers("barraprincipe", {
                    start: i, 
                    end: i,
                })
            });
        }
        this.barraprincipe = this.add.sprite(950, 10, "barraprincipe");
        this.barraprincipe.setOrigin (0,0);
        this.barraprincipe.setScale (0.8);
        this.barraprincipe.setScrollFactor(0, 0);
        this.barraprincipe.anims.play("barraprincipe0");

        // PAUSA
        this.bottonepausa = this.add.image(this.game.config.width-185, this.game.config.height - 60, "bottonepausa");
        this.bottonepausa.setOrigin(0,0);
        this.bottonepausa.setScale(0.8);
        this.bottonepausa.setScrollFactor(0,0);
        this.bottonepausa.setInteractive();
        this.bottonepausa.on("pointerdown", ()=>{
           this.scene.pause();
           this.scene.launch("pausalivellocastello", {sceneName: "livellocastello"});
       });

        // GIOCATORE
        const thePlayer = new Player2(this, 0, this.floorHeight, 1280);
        this.player = this.physics.add.existing(thePlayer); 
        this.physics.add.collider(this.player, this.floor); 
        this.physics.add.collider(this.player, this.parete1); 
        this.physics.add.collider(this.player, this.parete2); 
        this.player.body.setSize(100, 300);

        // NEMICO3
        const theEnemy3 = new Enemy3(this, 1000, this.floorHeight , 280);
        this.enemy3 = this.physics.add.existing(theEnemy3); 
        this.enemy3.initPhysics();
        this.physics.add.collider(this.enemy3, this.floor); 
        this.physics.add.collider(this.enemy3, this.parete1); 
        this.physics.add.collider(this.enemy3, this.parete2); 
        this.enemy3.body.setSize(100, 300);

        // FISICA - colonne
        this.colonne = this.physics.add.staticGroup({
            key: 'ramobasso',
            repeat: 1,
            setXY: { x: 300, y: 450, stepX: 680, stepY: 0}
        });
        this.physics.add.collider(this.colonne, this.player, ()=> {
            this.player.isJumping = false;
        });

        // FISICA - lampadario
        this.lampadario = this.physics.add.staticGroup({
            key: 'ramobasso',
            repeat: 1,
            setXY: { x: 590, y: 300, stepX: 100, stepY: 0}
        });
        this.physics.add.collider(this.lampadario, this.player, ()=> {
            this.player.isJumping = false;
        });

        // TASTO F PER SPARARE
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        // ISTRUZIONE2
        this.istruzione2 = this.add.image(640,360,"istruzione2");       
        this.istruzione2.setOrigin(0.5,0.5);
        this.istruzione2.setScale(0.8);
        this.timedEvent = this.time.delayedCall(1700, onEvent, [], this);

        function onEvent () {
            this.istruzione2.destroy();
        }
    }


    update() {
        // AZIONI CHE VENGONO ESEGUITE A OGNI FRAME DEL GIOCO
        this.player.manageMovements();
        this.enemy3.manageMovements();

        // FRECCIA
        const minTimeBetweenFrecce = 500;    // Tempo minimo in millisencondi tra il lancio di una freccia e l'altra
        const timeFromPreviousFreccia = this.time.now-this.lastFreccia;   // Tempo di adesso meno il lancio dell'ultima freccia
        if(this.keyF.isDown && timeFromPreviousFreccia > minTimeBetweenFrecce) {
            this.lastFreccia = this.time.now;      // Setto il tempo per il prossimo giro
            const player_dir = this.player.flipX;   // Prendo la direzione di Robin, ovvero la direzione in cui lancio la freccia
            const f = new Freccia(this, this.player.x+60, this.player.y-100, 10, player_dir); // Creo una freccia
            // COLLISIONE TRA FRECCIA E NEMICO   
            this.physics.add.collider(this.enemy3, f, this.destroyFreccia, (enemy3, f) => {
                console.log("La freccia ha colpito il principe.");
                this.game.gameState.lives2 += 1;
                if (this.game.gameState.lives2 >=3) {
                    this.scene.start("haivinto");
                }
                this.barraprincipe.anims.play("barraprincipe" + this.game.gameState.lives2);
                this.enemy3.hitten = true;      // Quando il principe viene colpito inizia le dinamiche del movimento "hitten"
                this.enemy3.anims.play("enemyHit"); 
                this.enemy3.Moving = false;     // Principe smette di camminare
                this.enemy3.x += 50;     // Principe va indietro di 50px
                this.time.delayedCall(500, ()=> {    // Gestione dell'animazione del principe dopo 500ms in cui rimane colpito
                    this.enemy3.Moving = true;
                    if (this.player.x < this.enemy3.x) {
                        this.enemy3.body.setVelocityX(-200);
                    } else if (this.player.x >= this.enemy3.x) {
                        this.enemy3.body.setVelocityX(200);
                    }
                })
            })
            f.fire(); // Lancio la freccia
        } 

        // MOVIMENTI DEL PRINCIPE RISPETTO A ROBIN
        if(this.enemy3.hitten){     // Quando il principe viene colpito si ferma
            this.enemy3.body.setVelocityX(0);
        } else{
            if(this.enemy3.x > this.player.x && this.enemy3.y == this.player.y) {
                this.enemy3.body.setVelocityX(-200);
            } else if(this.enemy3.x < this.player.x && this.enemy3.y == this.player.y) {
                this.enemy3.body.setVelocityX(200);
            }
            if(this.enemy3.x > this.player.x && this.enemy3.y < this.player.y ) {
                this.enemy3.body.setVelocityX(-200);
            } else if (this.enemy3.x < this.player.x && this.enemy3.y < this.player.y ) {
                this.enemy3.body.setVelocityX(200);
            }
        }
        
        
        // RIBALZO ROBIN CON PRINCIPE
        this.physics.add.collider(this.player, this.enemy3, (player, enemy3) => {
            console.log("Robin ha scontrato il principe.");
            this.game.gameState.lives += 1;
            if (this.game.gameState.lives === 3) {
                this.scene.start("gameover");
            }
            this.barravita.anims.play("barravita" + this.game.gameState.lives);
        if (enemy3.body.touching.left) {
            player.body.setVelocityX(-400);
            player.body.setAccelerationX(210); 
            player.body.setVelocityY(-400); 
            player.body.setAccelerationY(110); 
            player.disablekeys(); 
        } else if (enemy3.body.touching.right) {
            player.body.setVelocityX(40000); 
            player.body.setAccelerationX(-2); 
            player.body.setVelocityY(-400); 
            player.body.setAccelerationY(2); 
            player.disablekeys(); 
        } else if (enemy3.body.touching.up) {
            player.body.setVelocityX(400); 
            player.body.setAccelerationX(-210); 
            player.body.setVelocityY(-800); 
            player.body.setAccelerationY(410); 
            player.disablekeys(); 
        }
        player.anims.play("playerHit");
    })

    }


    destroyFreccia(enemy3, freccia) {
        freccia.destroy();
    }
    
}