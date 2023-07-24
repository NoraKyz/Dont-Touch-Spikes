import { Background } from "./background";

export class BackgroundChallenges extends Background {
    constructor() {
        super();
    }

    _initComponent() {
        super._initRetangleTop();
        super._initRetangleBottom();
    }
}