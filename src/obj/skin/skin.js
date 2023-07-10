
export class Skin {
    constructor() {     
        this.texture1 = null;  // Default
        this.texture2 = null; // Flying while playing
        this.texture3 = null; // Flying while not playing
        this.particle = null; // Particle effect

        this.cost = {
            type: null, // Type of currency
            value: null // Amount of currency
        }
        this.enabled = false; // Has the player unlocked this skin?
    }
}