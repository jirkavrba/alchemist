import { Bottle } from "./bottle";

export type LevelState = Array<Bottle>

export interface Level {
    index: number,
    state: LevelState,
    start: LevelState
}