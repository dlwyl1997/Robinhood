export default class pausalivelloforesta extends Phaser.Scene {


    constructor(){
		super("pausalivelloforesta");
    }


    init(data){
        this.sceneName = data.sceneName;
    }


    preload(){
        console.log("pausalivelloforesta - Executing preload()");
    }


    create(){
        console.log("pausalivelloforesta - Executing create()");

        // SCHERMATA MENU
        this.schermatamenu = this.add.image(this.game.config.width/2, 0, "schermatamenu");
        this.schermatamenu.setOrigin(0.5,0);
    
        // BOTTONI
        this.bottonecontinuamenu = this.add.image(640, 400, "bottonecontinuamenu")
        this.bottonecontinuamenu.setInteractive();
        this.bottonecontinuamenu.on("pointerdown", ()=>{
            this.scene.resume(this.sceneName);
            this.scene.stop();
        });
        this.bottonericominciamenu = this.add.image(640, 320, "bottonericominciamenu")
        this.bottonericominciamenu.setInteractive();
        this.bottonericominciamenu.on("pointerdown", ()=>{
            this.scene.start("livelloforesta");
            this.scene.stop();
        });
    }


    update() {
        // TRASPARENZA BOTTONI
        if (this.bottonecontinuamenu.on("pointerover", ()=> {
            this.bottonecontinuamenu.alpha=0.7;
        }));
        if(this.bottonecontinuamenu.on("pointerout", ()=> {
            this.bottonecontinuamenu.alpha=1;
        }));
        if (this.bottonericominciamenu.on("pointerover", ()=> {
            this.bottonericominciamenu.alpha=0.7;
        }));
        if(this.bottonericominciamenu.on("pointerout", ()=> {
            this.bottonericominciamenu.alpha=1;
        }));
    }
}