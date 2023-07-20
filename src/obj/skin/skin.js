
export class Skin {
    constructor(data) {     
        this.texture1 = data.texture1;  // Default
        this.texture2 = data.texture2; // Flying while playing
        this.texture3 = data.texture3; // Flying while not playing
        this.particleImage = data.particleImage; // Particle effect
        this.particleColer = data.particleColer; // Particle effect color

        this.cost = data.cost
        this.enabled = data.enabled; // Has the player unlocked this skin?
    }
}