import { Color, colorClasses } from "../game/colors"


export interface ColorComponentProps {
    color: Color,
    above?: Color | null,
    below?: Color | null
}

export const ColorComponent: React.FC<ColorComponentProps> = ({ color, above = null, below = null }: ColorComponentProps) => {
    const top = (above === color) ? "mt-0" : "mt-2 rounded-t-full";
    const bottom = (below === color) ? "mb-0" : "mb-2 rounded-b-full";

    return (
        <div className={`w-16 h-16 mx-4 border-white ${colorClasses[color]} ${top} ${bottom}`}></div>
    );
};

export interface BottleComponentProps {
    capacity: number,
    stack: Array<Color>,
    selected?: boolean,
    available?: boolean,
    completed?: boolean,
    onSelect?: () => void,
}

export const BottleComponent: React.FC<BottleComponentProps> = ({ capacity, stack, selected = false, available = false, completed = false, onSelect = () => { } }: BottleComponentProps) => {
    const above = [null, ...[...stack].slice(0, -1)];
    const below = [...stack].slice(1);

    return (
        <div onClick={onSelect} className={`flex flex-col justify-end items-center cursor-pointer transition transform  filter
            ${selected ? "-translate-y-8" : "hover:-translate-y-5"} 
            ${(!selected && !available) ? "opacity-70 blur-sm" : "" }
        `}>
            <div className={`w-24 h-8 transition transform ${completed ? "bg-neutral-400 translate-y-0" : "bg-opacity-0 -translate-y-5"} rounded-t-xl`}/>
            <div className="w-28 border-8 border-neutral-200 mx-4 rounded-l-full rounded-r-full shadow-xl z-50"></div>
            <div className="flex flex-col justify-end mx-4 py-2 bg-neutral-100 rounded-2xl rounded-b-full min-h-24 w-24 z-10" style={{ height: `${(capacity + 1) * 4}rem` }}>
                {stack.map((color, i) => <ColorComponent key={i} color={color} above={above[i]} below={below[i]} />)}
            </div>
        </div>
    )
};