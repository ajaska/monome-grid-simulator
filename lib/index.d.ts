import "@babel/polyfill";
import blessed from "blessed";
export declare enum KeyState {
    Up = 0,
    Down = 1
}
declare type KeyHandler = (x: number, y: number, s: KeyState) => void;
export interface MonomeGrid {
    refresh(leds: number[][]): void;
    key(keyHandler: KeyHandler): void;
}
declare class MonomeGridSimulator implements MonomeGrid {
    screen: blessed.Widgets.Screen;
    boxes: blessed.Widgets.BoxElement[][];
    keyHandler?: KeyHandler;
    constructor();
    refresh(led: number[][]): void;
    key(keyHandler: KeyHandler): void;
    private handleBoxMouseEvent;
    private addBoxAtGridPos;
}
export default function monomeGrid(): Promise<MonomeGridSimulator>;
export {};
