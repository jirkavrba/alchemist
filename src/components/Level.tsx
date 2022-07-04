import { useState } from "react";
import { Bottle } from "../game/bottle";
import { LevelState } from "../game/levels";
import { BottleComponent } from "./Bottle";

export interface LevelComponentProps {
    index: number,
    state: LevelState
}

export const LevelComponent: React.FC<LevelComponentProps> = ({ index, state }: LevelComponentProps) => {
    const [selected, setSelected] = useState<number>();
    const [available, setAvailable] = useState<Array<number>>([]);
    const [currentState, setCurrentState] = useState<LevelState>(state);

    const select = (index: number) => {
        setCurrentState(currentState => {
            if (selected !== undefined) {
                const from = selected;
                const to = index;

                // Cancel selection by clicking the same bottle again
                if (from === to) {
                    setSelected(undefined);
                    return currentState;
                }

                // Ignore clicking on bottles, that are not available for selection
                if (!available.includes(to)) {
                    return currentState;
                }

                const [source, destination] = currentState[from].pourInto(currentState[to]);
                const copy = [...currentState];

                copy.splice(from, 1, source);
                copy.splice(to, 1, destination);

                setSelected(undefined);
                setAvailable([]);

                return copy;
            }

            const current = state[index];

            setSelected(index);
            setAvailable(
                currentState
                    .map((bottle, i) => current.canBePouredInto(bottle) ? i : null)
                    .filter(i => i !== index)
                    .filter(i => i !== null) as Array<number>
            );

            return currentState;
        });
    }

    const isCompleted = (bottle: Bottle, others: Array<Bottle>): boolean => {
        if (!bottle.isFull()) {
            return false;
        }

        const content = bottle.stack[0];
        const allColorsMatch = bottle.stack.every(color => color === content);
        const noOtherBottleMatch = others.every(other => other.stack.every(color => color !== content));

        return allColorsMatch && noOtherBottleMatch;
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="mt-10 mb-20 text-3xl uppercase tracking-widest text-neutral-500 font-bold">
                Level <strong className="text-black">{index.toString().padStart(2, "0")}</strong>
            </h1>
            <div className="flex flex-row items-end justify-center">
                {currentState.map((bottle, i) =>
                    <BottleComponent key={i} {...bottle}
                        selected={selected === i}
                        available={selected === undefined || (available.length > 0 && available.includes(i))}
                        completed={isCompleted(bottle, currentState.filter((_, j) => i !== j))}
                        onSelect={() => select(i)}
                    />)
                }
            </div>
        </div>
    );
};