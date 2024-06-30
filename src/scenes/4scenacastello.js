export default class scenacastello extends Phaser.Scene {


    constructor(){
		super("scenacastello");
    }


    init(){
        console.log("scenacastello - Executing init()");
    }


    preload() {
        console.log("scenacastello - Executing preload()");
    }


    create() {
        console.log("scenacastello - Executing create()");

        // SFONDO
        this.background = this.add.image(0, 0, "scenacastello");
        this.background.setOrigin(0,0);

        // BOTTONI
        this.bottoneavanti = this.add.image(1250, 360, "bottoneavanti");
        this.bottoneavanti.setOrigin(0, 0);
        this.bottoneavanti.setInteractive(); 
        this.bottoneavanti.on("pointerdown", ()=>{ 
            this.scene.start("livelloforesta");
        })
        this.bottoneindietro = this.add.image(0, 360, "bottoneindietro");
        this.bottoneindietro.setOrigin(0, 0);
        this.bottoneindietro.setInteractive(); 
        this.bottoneindietro.on("pointerdown", ()=>{ 
            this.scene.start("scenavillaggio");
        })
    }
}