export enum Color {
    Yellow = "yellow",
    Orange = "orange",
    Red = "red",
    Pink = "pink",
    Purple = "purple",
    Blue = "blue",
    Cyan = "cyan",
    Green = "green",
    Brown = "brown",
};

export const colorClasses: Record<Color, string> = {
    [Color.Yellow]: "bg-yellow-600",
    [Color.Orange]: "bg-amber-600",
    [Color.Red]: "bg-red-500",
    [Color.Pink]: "bg-rose-500",
    [Color.Purple]: "bg-indigo-600",
    [Color.Blue]: "bg-sky-500",
    [Color.Cyan]: "bg-cyan-500",
    [Color.Green]: "bg-green-500",
    [Color.Brown]: "bg-brown-600"
};