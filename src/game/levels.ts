import { Bottle } from "./bottle";

export interface LevelState {
    bottles: Array<Bottle>
}

export interface Level {
    index: number,
    state: LevelState,
    start: LevelState
}