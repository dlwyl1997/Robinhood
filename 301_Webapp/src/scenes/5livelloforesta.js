import Enemy from "../components/enemy.js";
import Enemy2 from "../components/enemy2.js";
import Player from "../components/player.js"

export default class livelloforesta extends Phaser.Scene {


    // NOME IDENTIFICATIVO SCENA - Il costruttore della classe base Phaser.Scene prende come argomento il nome della scena
    constructor() {
        super("livelloforesta"); 
        this.sovrapposizione_player_interazione = false;
    }


    // INIT - inizializzazione delle proprietà della classe, l’assegnazione di valori iniziali standard
    init() { 
        console.log("livelloforesta - Executing init()");
        this.floorHeight = this.game.config.height - 60; // Altezza del terreno rispetto al riquadro di gioco
        this.floorWidth = 6000; // Larghezza del terreno rispetto al riquadro di gioco
        this.worldWidth = 1800; // Lunghezza del mondo del platform
    }
        

    // PRELOAD - identifica le risorse multimediali (es.immagini)
    preload() {
        console.log("livelloforesta - Executing preload()"); 
    }


    // CREATE - crea scena; modifica le risorse multimediali (es.immagini)
    create() {
        console.log("livelloforesta - Executing create()");
        
        // BACKGROUND
        this.background = this.add.tileSprite(0, 0, 1280, 720, "background"); // Posizione immagine di sfondo 
        this.background.setOrigin(0, 0); // Pivot dell'immagine di sfondo
        this.background.setScrollFactor(0, 0); // Immagine ferma rispetto alla camera

        // RAMI
        this.ramobassosopra = this.physics.add.staticGroup({ // Creazione di un gruppo di rami
            key: 'ramobassosopra', // Nome univoco del gruppo
            repeat: 1, // Ripetizioni dei rami
            setXY: { x: 1180, y: 470, stepX: 1580, stepY: 0} // Posizione e distanza dei rami
        });

        this.ramoaltosopra = this.physics.add.staticGroup({
            key: 'ramoaltosopra',
            repeat: 1,
            setXY: { x: 1775, y: 350, stepX: 1960, stepY: 0}
        });

        this.ramomediosopra = this.physics.add.staticGroup({
            key: 'ramomediosopra',
            repeat: 1,
            setXY: { x: 4510, y: 370, stepX: 920, stepY: 0}
        });

        // MIDGROUND
        this.midground = this.add.tileSprite(0, 0, 1280, 720, "midground"); 
        this.midground.setOrigin(0, 0); 
        this.midground.setScrollFactor(0, 0);

        // TERRENO
        this.floor1 = this.add.rectangle(-640, this.game.config.height, this.worldWidth + 200, this.game.config.height - this.floorHeight,0xFFFFFF, 0);
        this.floor1.setScrollFactor(0, 0);
        this.floor1.setOrigin(0, 1);
        this.floor2 = this.add.rectangle(1670, this.game.config.height, this.worldWidth - 200, this.game.config.height - this.floorHeight,0xFFFFFF, 0);
        this.floor2.setScrollFactor(0, 0);
        this.floor2.setOrigin(0, 1);
        this.floor3 = this.add.rectangle(3600, this.game.config.height, this.worldWidth, this.game.config.height - this.floorHeight,0xFFFFFF, 0);
        this.floor3.setScrollFactor(0, 0);
        this.floor3.setOrigin(0, 1);
        this.floor4 = this.add.rectangle(5700, this.game.config.height, this.worldWidth, this.game.config.height - this.floorHeight,0xFFFFFF, 0);
        this.floor4.setScrollFactor(0, 0);
        this.floor4.setOrigin(0, 1);

        // FISICA - TERRENO
        this.physics.add.existing(this.floor1, true); // True indica che il corpo e' statico
        this.physics.add.existing(this.floor2, true); 
        this.physics.add.existing(this.floor3, true); 
        this.physics.add.existing(this.floor4, true); 

        // BURRONE
        this.burrone1 = this.add.image(1340, 620, "burrone");
        this.burrone1.setOrigin (0, 0);
        
        this.burrone2 = this.add.image(3280, 620, "burrone");
        this.burrone2.setOrigin (0, 0);

        this.burrone3 = this.add.image(5350, 620, "burrone");
        this.burrone3.setOrigin (0, 0);

        // MONETE sul terreno
        this.monete = []; // Ciclo di posizionamento randomico delle monete sul terreno
        for (let i=0; i<10; i++) {
            const monete = this.add.image (1100 + 1000 * i,this.floorHeight-Phaser.Math.Between(0, 0), "monete");
            monete.setOrigin(0.5, 1);
            this.monete.push(monete); // Funzione push relativa alla collisione tra robin e monete
        }
        this.moneteGroup = this.physics.add.group(this.monete);
        this.physics.add.collider(this.moneteGroup, this.floor1); // Le monete collidono con il suolo
        this.physics.add.collider(this.moneteGroup, this.floor2); 
        this.physics.add.collider(this.moneteGroup, this.floor3); 
        this.physics.add.collider(this.moneteGroup, this.floor4);

        // SASSI
        this.sassosopra = this.physics.add.staticGroup({
            key: 'sassosopra',
            repeat: 4,
            setXY: { x: 800, y: this.floorHeight - 50, stepX: 1800, stepY: 0},
        });

        // MONETE sui sassi
        this.monete2 = this.physics.add.staticGroup({
            key: 'monete',
            repeat: 4,
            setXY: { x: 800, y: this.floorHeight - 140, stepX: 1790, stepY: 0}
        });

        // MONETE sui rami alti
        this.monete3 = this.physics.add.staticGroup({
            key: 'monete',
            repeat: 1,
            setXY: { x: 1780, y: 310, stepX: 1950, stepY: 0}
        });

        // MONETE sui rami bassi
        this.monete4 = this.physics.add.staticGroup({
            key: 'monete',
            repeat: 1,
            setXY: { x: 1180, y: 420, stepX: 1580, stepY: 0}
        });

        // MONETE sui rami medi
        this.monete5 = this.physics.add.staticGroup({
            key: 'monete',
            repeat: 1,
            setXY: { x: 4500, y: 340, stepX: 950, stepY: 0} 
        });

        // BARRA MONETE
        for (let i = 0; i<=15; i++) {
            this.anims.create({
                key: "barramonete" + i,  // Nome univoco dell'animazione sommato alla variabile i
                frames: this.anims.generateFrameNumbers("barramonete", {
                    start: i, // Frame di partenza
                    end: i, // Frame di arrivo
                })
            });
        }
        this.barramonete = this.add.sprite(10, 10, "barramonete");
        this.barramonete.setOrigin (0,0);
        this.barramonete.setScale (0.8);
        this.barramonete.setScrollFactor(0, 0);
        this.barramonete.anims.play("barramonete0"); // Attivazione dell'animazione dal frame 0


        // ROBIN
        const thePlayer = new Player(this, 0, this.floorHeight, 10000);
        this.player = this.physics.add.existing(thePlayer); // aggiungi il player alla fisica
        this.player.body.setSize(100, 300);

        // FISICA - Robin
        this.physics.add.collider(this.player, this.floor1); // Robin deve collidere con il suolo
        this.physics.add.collider(this.player, this.floor2); 
        this.physics.add.collider(this.player, this.floor3); 
        this.physics.add.collider(this.player, this.floor4); 
        this.cameras.main.startFollow(this.player); // Imposta la camera per seguire i movimenti di Robin lungo l'asse x

        // COLLISIONE TRA GIOCATORE E MONETE (Robin raccoglie le monete)
        this.physics.add.overlap(this.player, this.moneteGroup, (player, moneta) => {
            moneta.destroy(); // Quando avviene la collisione, la moneta sparisce
            console.log("Robin ha preso la moneta.");
            this.game.gameState.score += 1; // Viene aggiunto un frame allo spritesheet
            this.barramonete.anims.play("barramonete" + this.game.gameState.score);
        })
        this.physics.add.overlap(this.player, this.monete2, (player, moneta) => {
            moneta.destroy();
            console.log("Robin ha preso la moneta.");
            this.game.gameState.score += 1;
            this.barramonete.anims.play("barramonete" + this.game.gameState.score);
        })
        this.physics.add.overlap(this.player, this.monete3, (player, moneta) => {
            moneta.destroy();
            console.log("Robin ha preso la moneta.");
            this.game.gameState.score += 1;
            this.barramonete.anims.play("barramonete" + this.game.gameState.score);
        })
        this.physics.add.overlap(this.player, this.monete4, (player, moneta) => {
            moneta.destroy();
            console.log("Robin ha preso la moneta.");
            this.game.gameState.score += 1;
            this.barramonete.anims.play("barramonete" + this.game.gameState.score);
        })
        this.physics.add.overlap(this.player, this.monete5, (player, moneta) => {
            moneta.destroy();
            console.log("Robin ha preso la moneta.");
            this.game.gameState.score += 1;
            this.barramonete.anims.play("barramonete" + this.game.gameState.score);
        })

        // GUARDIA
        const theEnemy = new Enemy(this, 1900, this.floorHeight , 4000);
        this.enemy = this.physics.add.existing(theEnemy); 
        this.enemy.initPhysics();
        this.enemy.body.setSize(150, 300);
        this.physics.add.collider(this.enemy, this.floor1); 
        this.physics.add.collider(this.enemy, this.floor2); 

        // GUARDIA2
        const theEnemy2 = new Enemy2(this, 3900, this.floorHeight , 4000);
        this.enemy2 = this.physics.add.existing(theEnemy2); 
        this.enemy2.initPhysics();
        this.enemy2.body.setSize(180, 300);
        this.physics.add.collider(this.enemy2, this.floor1); 
        this.physics.add.collider(this.enemy2, this.floor2); 

        // FOREGROUND
        this.foreground = this.add.tileSprite(0, 0, 1280, 720, "foreground"); 
        this.foreground.setOrigin(0, 0); 
        this.foreground.setScrollFactor(0, 0);

        // POP-UP ISTRUZIONI relative ai comandi per muoversi
        this.interazione = this.add.rectangle(20, this.floorHeight, 100, 150); // Rettangolo di interazione con Robin
        this.interazione.setOrigin(0,1);
        this.physics.add.existing(this.interazione, true);
        this.istruzione1 = this.add.image(580,360,"istruzione1"); // POP-UP delle istruzioni   
        this.istruzione1.setOrigin(0.5,0.5);
        this.istruzione1.setScale(0.6);
        this.istruzione1.alpha = 0;
        this.physics.add.existing(this.istruzione1, true);
        this.physics.add.overlap(this.interazione, this.player, ()=>{
            this.sovrapposizione_player_interazione = true; // Quando Robin passa sopra l'interazione, appare il POP-UP
        });

        // SCHERMATA MENU
        this.bottonepausa = this.add.image(this.game.config.width-185, this.game.config.height - 60, "bottonepausa");
        this.bottonepausa.setOrigin(0,0);
        this.bottonepausa.setScale(0.8);
        this.bottonepausa.setScrollFactor(0,0);
        this.bottonepausa.setInteractive();
        this.bottonepausa.on("pointerdown", ()=>{
            this.scene.pause();
            this.scene.launch("pausalivelloforesta", {sceneName: "livelloforesta"});
        });

        // FISICA - sassi
        this.sassosopra = this.physics.add.staticGroup({
            key: 'sasso',
            repeat: 4,
            setXY: { x: 800, y: this.floorHeight - 50, stepX: 1800, stepY: 0},
        });
        this.physics.add.collider(this.sassosopra, this.player, ()=> {
            this.player.isJumping = false; // Se Robin è su un sasso allora il suo stato è "non sta saltando" (questo per riprodurre l'animazione di Robin fermo) 
        });

        // FISICA - rami bassi
        this.ramobasso = this.physics.add.staticGroup({
            key: 'ramobasso',
            repeat: 1,
            setXY: { x: 1180, y: 470, stepX: 1600, stepY: 0}
        });
        this.physics.add.collider(this.ramobasso, this.player, ()=> {
            this.player.isJumping = false;
        });

        // FISICA - rami medi
        this.ramomedio = this.physics.add.staticGroup({
            key: 'ramomedio',
            repeat: 1,
            setXY: { x: 4515, y: 390, stepX: 940, stepY: 0}
        });
        this.physics.add.collider(this.ramomedio, this.player, ()=> {
            this.player.isJumping = false;
        });
        
        // FISICA - rami alti
        this.ramoalto = this.physics.add.staticGroup({
            key: 'ramoalto',
            repeat: 1,
            setXY: { x: 1780, y: 360, stepX: 1940, stepY: 0}
        });
        this.physics.add.collider(this.ramoalto, this.player, ()=> {
            this.player.isJumping = false;
        });
    }


    //UPDATE - istruzioni che definiscono il comportamento degli elementi della scena
    update() {
        
        // AZIONI CHE VENGONO ESEGUITE A OGNI FRAME DEL GIOCO
        this.player.manageMovements();
        this.enemy.manageMovements();
        this.enemy2.manageMovements();

        // RIBALZO ROBIN CON GUARDIA 1
        this.physics.add.collider(this.player, this.enemy, (player, enemy) => {
            console.log("Robin ha scontrato la guardia.");
            this.game.gameState.score -= 1;
            if (this.game.gameState.score <1) {
                this.scene.start("gameover");
            }
            this.barramonete.anims.play("barramonete" + this.game.gameState.score);
            if (enemy.body.touching.left) { // Quando Robin scontra la guardia da sinistra
                player.body.setVelocityX(-200); // Rimbalzo indietro 
                player.body.setAccelerationX(110); // Azzera la velocità
                player.body.setVelocityY(-400); // Rimbalzo in alto
                player.body.setAccelerationY(110); // Azzera la velocità
                player.disablekeys(); // Disabilita dei tasti
            } else if (enemy.body.touching.right) { // Quando Robin scontra la guardia da destra
                player.body.setVelocityX(2000); 
                player.body.setAccelerationX(-110); 
                player.body.setVelocityY(-400); 
                player.body.setAccelerationY(2); 
                player.disablekeys(); 
            } else if (enemy.body.touching.up) { // Quando Robin scontra la guardia da sopra
                player.body.setVelocityX(200); 
                player.body.setAccelerationX(-110); 
                player.body.setVelocityY(-600); 
                player.body.setAccelerationY(110); 
                player.disablekeys(); 
            }
            player.anims.play("playerHit"); // Si attiva l'animazione dello spritesheet di Robin colpito
            
        })

        // RIBALZO ROBIN CON GUARDIA 2
        this.physics.add.collider(this.player, this.enemy2, (player, enemy2) => {
            console.log("Robin ha scontrato la guardia.");
            this.game.gameState.score -= 1;
            if (this.game.gameState.score <1) {
                this.scene.start("gameover");
            }
            this.barramonete.anims.play("barramonete" + this.game.gameState.score);
            if (enemy2.body.touching.left) {
                player.body.setVelocityX(-200); 
                player.body.setAccelerationX(110); 
                player.body.setVelocityY(-400); 
                player.body.setAccelerationY(110); 
                player.disablekeys(); 
            } else if (enemy2.body.touching.right) {
                player.body.setVelocityX(2000); 
                player.body.setAccelerationX(-110); 
                player.body.setVelocityY(-400); 
                player.body.setAccelerationY(2); 
                player.disablekeys(); 
            } else if (enemy2.body.touching.up) {
                player.body.setVelocityX(200); 
                player.body.setAccelerationX(-110); 
                player.body.setVelocityY(-600); 
                player.body.setAccelerationY(110); 
                player.disablekeys(); 
            }
            player.anims.play("playerHit");
        })


        // AVVIAMO LA SCENA GAMEOVER - Se Robin cade nel burrone
        if (this.player.y >= this.game.config.height && this.player.body.x > 1000) {
            this.scene.stop();
            this.scene.start("gameover");
        }

        // AVVIAMO LA SCENA GAMEOVER - Se Robin arriva alla fine con - di 10 monete
        if (this.player.x >= this.floorWidth + 630 && this.game.gameState.score <= 9) {
            this.scene.stop();
            this.scene.start("gameover");
        }

        // AVVIAMO LA SCENA CASTELLO - Se Robin arriva alla fine con + di 10 monete
        if (this.player.x >= this.floorWidth + 630 && this.game.gameState.score >= 10) {
            this.scene.stop();
            this.scene.start("livellocastello");
        }

        // INTERAZIONE TRA ROBIN E LE ISTRUZIONI
        if (this.sovrapposizione_player_interazione==true){
            this.istruzione1.alpha = 1;
        }
        if (this.sovrapposizione_player_interazione==false){
            this.istruzione1.alpha = 0;
        }
        this.sovrapposizione_player_interazione=false;

        // CAMERA - inizia a muoversi da metà schermo mentre Robin parte dall'inizio
        this.cameras.main.followOffset.y = this.player.body.y + this.player.height/2 - this.game.config.height / 2; // Offset indica la posizione della videocamera rispetto alla posizione originale
        if (this.player.body.x <= this.game.config.width/2) {
            this.cameras.main.followOffset.x = - this.game.config.width/2 + this.player.body.x; 
        }
        if (this.player.body.x >= this.floorWidth) {
            this.cameras.main.followOffset.x = this.player.body.x - this.floorWidth;
        }

        // CAMERA E SFONDO
        this.background.tilePositionX = this.cameras.main.scrollX * 0.8;
        this.midground.tilePositionX = this.cameras.main.scrollX * 1;
        this.foreground.tilePositionX = this.cameras.main.scrollX * 1.1;


    
    }
}