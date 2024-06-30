export default class paginamenu extends Phaser.Scene {


    constructor(){
		super("paginamenu");
    }


    init(){
        console.log("paginamenu - Executing init()");
    }


    preload() {
        console.log("paginamenu - Executing preload()");
        
        // BACKGROUND
        this.load.image("menu", "assets/images/background/0menu.png");
        this.load.image("crediti", "assets/images/background/1crediti.png");
        this.load.image("scenaforesta", "assets/images/background/2scenaforesta.png"); 
        this.load.image("scenavillaggio", "assets/images/background/3scenavillaggio.png");
        this.load.image("scenacastello", "assets/images/background/4scenacastello.png");
        this.load.image("background", "assets/images/background/5background.png");
        this.load.image("midground", "assets/images/background/6midground.png");
        this.load.image("foreground", "assets/images/background/7foreground.png");
        this.load.image("background2", "assets/images/background/8background2.png");
        this.load.image("gameover", "assets/images/background/9gameover.png"); 
        this.load.image("haivinto", "assets/images/background/10haivinto.png"); 
        
        // CHARACTERS
        // ROBIN SCENA FORESTA
        const player_spritesheet_config = {
            frameWidth: 301,
            frameHeight: 344,
        };
        this.load.spritesheet("playerrun", "assets/images/characters/player.png", player_spritesheet_config);
        // ROBIN SCENA CASTELLO
        const player2_spritesheet_config = {
            frameWidth: 301,
            frameHeight: 344,
        };
        this.load.spritesheet("playerrun2", "assets/images/characters/player2.png", player2_spritesheet_config);
        // GUARDIA
        const enemy_spritesheet_config = {
            frameWidth:  322,
            frameHeight: 345,
        };
        this.load.spritesheet("enemyrun", "assets/images/characters/enemy.png", enemy_spritesheet_config);
        // PRINCIPE
        const enemy3_spritesheet_config = {
            frameWidth:  404,
            frameHeight: 344,
        };
        this.load.spritesheet("enemy3run", "assets/images/characters/enemy3.png", enemy3_spritesheet_config);

        // ELEMENTS
        this.load.image("bottonepausa", "assets/images/elements/bottonepausa.png"); 
        this.load.image("bottonericominciamenu", "assets/images/elements/bottonericominciamenu.png");  
        this.load.image("bottonecontinuamenu", "assets/images/elements/bottonecontinuamenu.png");  
        this.load.image("bottonericominciagameover", "assets/images/elements/bottonericominciagameover.png"); 
        this.load.image("bottonemenugameover", "assets/images/elements/bottonemenugameover.png"); 
        this.load.image("bottonemenucrediti", "assets/images/elements/bottonemenucrediti.png"); 
        this.load.image("schermatamenu", "assets/images/elements/schermatamenu.png"); 
        this.load.image("bottoneavanti", "assets/images/elements/bottoneavanti.png"); 
        this.load.image("bottoneindietro", "assets/images/elements/bottoneindietro.png");
        this.load.image("freccia", "assets/images/elements/freccia.png");
        this.load.image("ramomedio", "assets/images/elements/ramomedio.png");
        this.load.image("ramobasso", "assets/images/elements/ramobasso.png");
        this.load.image("ramoalto", "assets/images/elements/ramoalto.png");
        this.load.image("ramomediosopra", "assets/images/elements/ramomediosopra.png");
        this.load.image("ramobassosopra", "assets/images/elements/ramobassosopra.png");
        this.load.image("ramoaltosopra", "assets/images/elements/ramoaltosopra.png");
        this.load.image("sasso", "assets/images/elements/sasso.png");
        this.load.image("sassosopra", "assets/images/elements/sassosopra.png");
        this.load.image("monete", "assets/images/elements/monete.png"); 
        this.load.image("bottonestoria", "assets/images/elements/bottonestoria.png"); 
        this.load.image("bottonegioca", "assets/images/elements/bottonegioca.png"); 
        this.load.image("bottonecrediti", "assets/images/elements/bottonecrediti.png"); 
        this.load.image("burrone", "assets/images/elements/burrone.png");
        this.load.image("istruzione1", "assets/images/elements/istruzione1.png");
        this.load.image("istruzione2", "assets/images/elements/istruzione2.png");
        this.load.image("colonna1", "assets/images/elements/colonna1.png");
        this.load.image("colonna2", "assets/images/elements/colonna2.png");
        this.load.image("lampadario", "assets/images/elements/lampadario.png");
        // BARRAMONETE 
        const barramonete_spritesheet_config = {
            frameWidth:  400,
            frameHeight: 100,
        };
        this.load.spritesheet("barramonete", "assets/images/elements/barramonete.png", barramonete_spritesheet_config);
        // BARRAVITE ROBIN
        const barravita_spritesheet_config = {
            frameWidth:  400,
            frameHeight: 100,
        };
        this.load.spritesheet("barravita", "assets/images/elements/barravita.png", barravita_spritesheet_config);
        // BARRAVITE 
        const barraprincipe_spritesheet_config = {
            frameWidth:  400,
            frameHeight: 100,
        };
        this.load.spritesheet("barraprincipe", "assets/images/elements/barraprincipe.png", barraprincipe_spritesheet_config);
    }


    create() {
        console.log("paginamenu - Executing create()");

        // SFONDO
        this.background = this.add.image(0, 0, "menu");
        this.background.setOrigin(0,0);

        // BOTTONI
        this.bottonestoria = this.add.image(this.game.config.width/2, this.game.config.height/2, "bottonestoria");
        this.bottonestoria.setOrigin(1.45, -1);
        this.bottonestoria.setScale(0.8);
        this.bottonestoria.setInteractive(); // L'immagine è interattiva
        this.bottonestoria.on("pointerdown", ()=>{ // Quando viene cliccato il bottone, inizia il racconto della storia
            this.scene.start("scenaforesta");
        });

        this.bottonegioca = this.add.image(this.game.config.width/2, this.game.config.height/2, "bottonegioca");
        this.bottonegioca.setOrigin(1.65, -2.75);
        this.bottonegioca.setScale(0.8);
        this.bottonegioca.setInteractive(); 
        this.bottonegioca.on("pointerdown", ()=>{  
            this.scene.start("livelloforesta");
        });

        this.bottonecrediti = this.add.image(this.game.config.width/2, this.game.config.height/2, "bottonecrediti");
        this.bottonecrediti.setOrigin(1.35, -4.5);
        this.bottonecrediti.setScale(0.8);
        this.bottonecrediti.setInteractive(); 
        this.bottonecrediti.on("pointerdown", ()=>{ 
            this.scene.start("paginacrediti");
        });
    }


    update() {
        // TRASPARENZA BOTTONI
        if (this.bottonestoria.on("pointerover", ()=> {
            this.bottonestoria.alpha=0.7;
        }));
        if(this.bottonestoria.on("pointerout", ()=> {
            this.bottonestoria.alpha=1;
        }));

        if (this.bottonegioca.on("pointerover", ()=> {
            this.bottonegioca.alpha=0.7;
        }));
        if(this.bottonegioca.on("pointerout", ()=> {
            this.bottonegioca.alpha=1;
        }));

        if (this.bottonecrediti.on("pointerover", ()=> {
            this.bottonecrediti.alpha=0.7;
        }));
        if(this.bottonecrediti.on("pointerout", ()=> {
            this.bottonecrediti.alpha=1;
        }));
        }

};

