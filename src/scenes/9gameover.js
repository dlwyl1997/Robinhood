export default class gameover extends Phaser.Scene {

    constructor(){
		super("gameover");
    }


    init(){
        console.log("gameover - Executing init()");
    }


    preload() {
        console.log("gameover - Executing preload()");
    }


    create() {
        console.log("gameover - Executing create()");

        // SFONDO
        this.background = this.add.image(0, 0, "gameover");
        this.background.setOrigin(0,0);

        // BOTTONE RICOMINCIA
        this.bottonericominciagameover = this.add.image(180, this.game.config.height - 140, "bottonericominciagameover");
        this.bottonericominciagameover.setOrigin(0, 0.5);
        this.bottonericominciagameover.setScale(0.7); 
        this.bottonericominciagameover.setInteractive(); 
        this.bottonericominciagameover.on("pointerdown", ()=>{ 
            this.scene.start("livelloforesta");
            this.game.gameState.score = 0;
            this.game.gameState.lives = 0;
            this.game.gameState.lives2 = 0;
        });
        this.bottonemenugameover = this.add.image(200, this.game.config.height - 70, "bottonemenugameover");
        this.bottonemenugameover.setOrigin(0, 0.5);
        this.bottonemenugameover.setScale(0.7); 
        this.bottonemenugameover.setInteractive(); 
        this.bottonemenugameover.on("pointerdown", ()=>{ 
            this.scene.start("paginamenu");
            this.game.gameState.score = 0;
            this.game.gameState.lives = 0;
            this.game.gameState.lives2 = 0;
        });
    }

    update() {
        // TRASPARENZA BOTTONI
        if (this.bottonericominciagameover.on("pointerover", ()=> {
            this.bottonericominciagameover.alpha=0.7;
        }));
        if(this.bottonericominciagameover.on("pointerout", ()=> {
            this.bottonericominciagameover.alpha=1;
        }));
        if (this.bottonemenugameover.on("pointerover", ()=> {
            this.bottonemenugameover.alpha=0.7;
        }));
        if(this.bottonemenugameover.on("pointerout", ()=> {
            this.bottonemenugameover.alpha=1;
        }));
    }

};