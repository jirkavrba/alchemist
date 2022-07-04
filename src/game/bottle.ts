import { Color } from "./colors";

export class Bottle {

    readonly capacity: number;

    readonly stack: Array<Color>;

    public constructor(capacity: number, stack: Array<Color> = []) 
    {
        this.capacity = capacity;
        this.stack = stack;
    }

    public isEmpty(): boolean {
        return this.stack.length === 0;
    }

    public isFull(): boolean {
        return this.stack.length === this.capacity;
    }

    public getTopmostSegment(): Array<Color> {
        if (this.isEmpty()) {
            return [];
        }

        const matching = [];
        const target = this.stack[0];

        for (let color of this.stack) {
            if (color !== target) {
                return matching;
            }

            matching.push(color);
        }

        return matching;
    }

    public canBePouredInto(destination: Bottle): boolean {
        if (this.isEmpty() || destination.isFull()) {
            return false;
        }

        const segment = this.getTopmostSegment();
        const space = destination.capacity - destination.stack.length;

        const matches = destination.isEmpty() || segment[0] === destination.stack[0];
        const fits = segment.length <= space;

        console.log(segment, this.stack, destination.stack, space);

        return matches && fits;
    }

    public pourInto(destination: Bottle): [Bottle, Bottle] {
        const source = [...this.stack].slice(this.getTopmostSegment().length);
        const target = [...this.getTopmostSegment(), ...destination.stack];

        return [
            new Bottle(this.capacity, source),
            new Bottle(destination.capacity, target)
        ]
    }
}