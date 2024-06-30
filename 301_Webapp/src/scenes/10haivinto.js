export default class haivinto extends Phaser.Scene {

    constructor(){
		super("haivinto");
    }


    init(){
        console.log("haivinto - Executing init()");
    }


    preload() {
        console.log("haivinto - Executing preload()");
    }


    create() {
        console.log("haivinto - Executing create()");

        // SFONDO
        this.background = this.add.image(0, 0, "haivinto");
        this.background.setOrigin(0,0);

        // BOTTONE RICOMINCIA
        this.bottonemenugameover = this.add.image(50, this.game.config.height - 50, "bottonemenugameover");
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
        if (this.bottonemenugameover.on("pointerover", ()=> {
            this.bottonemenugameover.alpha=0.7;
        }));
        if(this.bottonemenugameover.on("pointerout", ()=> {
            this.bottonemenugameover.alpha=1;
        }));
    }

};