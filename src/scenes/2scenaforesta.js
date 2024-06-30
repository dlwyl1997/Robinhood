export default class scenaforesta extends Phaser.Scene {
    

    constructor(){
		super("scenaforesta");
    }


    init(){
        console.log("scenaforesta - Executing init()");
    }

    
    preload() {
        console.log("scenaforesta - Executing preload()");
    }


    create() {
        console.log("scenaforesta - Executing create()");

        // SFONDO
        this.background = this.add.image(0, 0, "scenaforesta");
        this.background.setOrigin(0,0);

        // BOTTONI
        this.bottoneavanti = this.add.image(1250, 360, "bottoneavanti");
        this.bottoneavanti.setOrigin(0, 0);
        this.bottoneavanti.setInteractive(); 
        this.bottoneavanti.on("pointerdown", ()=>{ 
            this.scene.start("scenavillaggio");
        })
        this.bottoneindietro = this.add.image(0, 360, "bottoneindietro");
        this.bottoneindietro.setOrigin(0, 0);
        this.bottoneindietro.setInteractive(); 
        this.bottoneindietro.on("pointerdown", ()=>{ 
            this.scene.start("paginamenu");
        })
    }
}