export default class paginacrediti extends Phaser.Scene {
    

    constructor(){
		super("paginacrediti");
    }

    init(){
        console.log("paginacrediti - Executing init()");
    }


    preload() {
        console.log("paginacrediti - Executing preload()");
    }


    create() {
        console.log("paginacrediti - Executing create()");

        // SFONDO
        this.background = this.add.image(0, 0, "crediti");
        this.background.setOrigin(0,0);

        // BOTTONE MENU
        this.bottonemenucrediti = this.add.image(50, this.game.config.height - 50, "bottonemenucrediti");
        this.bottonemenucrediti.setOrigin(0, 0.5);
        this.bottonemenucrediti.setScale(0.7); 
        this.bottonemenucrediti.setInteractive(); 
        this.bottonemenucrediti.on("pointerdown", ()=>{ 
            this.scene.start("paginamenu");
            this.game.gameState.score = 0;
        });
    }

    update() {
        // TRASPARENZA BOTTONI
        if (this.bottonemenucrediti.on("pointerover", ()=> {
            this.bottonemenucrediti.alpha=0.7;
        }));
        if(this.bottonemenucrediti.on("pointerout", ()=> {
            this.bottonemenucrediti.alpha=1;
        }));
    }
}


