
export const TypeChallenge = Object.freeze({
    CollectCandy: "candy",
    BestScore: "score",
    GamesPlayed: "gamesPlayed"    
});

export const AvailableScene = Object.freeze({
    Any: "any",
    ClassicMode: "classicMode",
    HardMode: "hardMode",
    DualMode: "dualMode",
});

export class ChallengesStorage {
    static init() {
        this.storage = [
            {
                id: 1,
                type: TypeChallenge.CollectCandy,
                descriptsion: "Collect 10 candies",
                progress: 0,
                goal: 10,
                scene: AvailableScene.Any,
                completed: false,
            },
            {
                id: 2,
                type: TypeChallenge.BestScore,
                descriptsion: "Get 10 points in hard mode",
                progress: 0,
                goal: 10,
                scene: AvailableScene.HardMode,
                completed: false,
            },
            {
                id: 3,
                type: TypeChallenge.GamesPlayed,
                descriptsion: "Play 5 times in classic mode",
                progress: 0,
                goal: 5,
                scene: AvailableScene.ClassicMode,
                completed: false,
            },
            {
                id: 4,
                type: TypeChallenge.CollectCandy,
                descriptsion: "Collect 50 candies",
                progress: 0,
                goal: 50,
                scene: AvailableScene.Any,
                completed: false,
            },
            {
                id: 5,
                type: TypeChallenge.BestScore,
                descriptsion: "Get 25 points in hard mode",
                progress: 0,
                goal: 25,
                scene: AvailableScene.HardMode,
                completed: false,
            },
            {
                id: 6,
                type: TypeChallenge.GamesPlayed,
                descriptsion: "Play 5 times in dual mode",
                progress: 0,
                goal: 5,
                scene: AvailableScene.DualMode,
                completed: false,
            },
            {
                id: 7,
                type: TypeChallenge.CollectCandy,
                descriptsion: "Collect 100 candies",
                progress: 0,
                goal: 100,
                scene: AvailableScene.Any,
                completed: false,
            },
            {
                id: 8,
                type: TypeChallenge.BestScore,
                descriptsion: "Get 50 points in hard mode",
                progress: 0,
                goal: 50,
                scene: AvailableScene.HardMode,
                completed: false,
            },
            {
                id: 9,
                type: TypeChallenge.BestScore,
                descriptsion: "Get 100 points in classic mode",
                progress: 0,
                goal: 100,
                scene: AvailableScene.ClassicMode,
                completed: false,
            },
        ];
    }
}