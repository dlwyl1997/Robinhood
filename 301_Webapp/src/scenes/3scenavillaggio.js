export default class scenavillaggio extends Phaser.Scene {


    constructor(){
		super("scenavillaggio");
    }


    init(){
        console.log("scenavillaggio - Executing init()");
    }


    preload() {
        console.log("scenavillaggio - Executing preload()");
    }


    create() {
        console.log("scenavillaggio - Executing create()");

        // SFONDO
        this.background = this.add.image(0, 0, "scenavillaggio");
        this.background.setOrigin(0,0);

        // BOTTONI
        this.bottoneavanti = this.add.image(1250, 360, "bottoneavanti");
        this.bottoneavanti.setOrigin(0, 0);
        this.bottoneavanti.setInteractive(); 
        this.bottoneavanti.on("pointerdown", ()=>{ 
            this.scene.start("scenacastello");
        })
        this.bottoneindietro = this.add.image(0, 360, "bottoneindietro");
        this.bottoneindietro.setOrigin(0, 0);
        this.bottoneindietro.setInteractive(); 
        this.bottoneindietro.on("pointerdown", ()=>{ 
            this.scene.start("scenaforesta");
        })
    }
}