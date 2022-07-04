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

    public getTopmostSegment(): Array<Color> | null {
        if (this.isEmpty()) {
            return null;
        }

        const reversed = [...this.stack].reverse();
        const length = reversed.findIndex((color, index) =>
            index === reversed.length &&
            color !== reversed[0]
        );

        return [...reversed].slice(length);
    }

    public canBePouredInto(destination: Bottle): boolean {
        if (this.isEmpty()) {
            return false;
        }

        if (destination.isFull()) {
            return false;
        }

        const segment = this.getTopmostSegment();
        const other = destination.getTopmostSegment();

        return segment !== null &&
               other !== null &&
               other[0] === segment[0];
    }
}