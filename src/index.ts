import blessed from "blessed";

export enum KeyState {
  Up = 0,
  Down = 1
}

type KeyHandler = (x: number, y: number, s: KeyState) => void;

export interface MonomeGrid {
  refresh(leds: number[][]): void;
  key(keyHandler: KeyHandler): void;
}

const brightnessToColor: { [brightness: number]: string | undefined } = {
  0: "#000000",
  1: "#111111",
  2: "#222222",
  3: "#333333",
  4: "#444444",
  5: "#555555",
  6: "#666666",
  7: "#777777",
  8: "#888888",
  9: "#999999",
  10: "#aaaaaa",
  11: "#bbbbbb",
  12: "#cccccc",
  13: "#dddddd",
  14: "#eeeeee",
  15: "#ffffff"
};

class MonomeGridSimulator implements MonomeGrid {
  screen: blessed.Widgets.Screen;
  boxes: blessed.Widgets.BoxElement[][];
  keyHandler?: KeyHandler;

  constructor() {
    this.screen = blessed.screen({ smartCSR: true });
    this.screen.title = "Monome Simulator";

    // Quit on Escape, q, or Control-C.
    this.screen.key(["escape", "q", "C-c"], function(ch, key) {
      return process.exit(0);
    });

    const boxes = [];
    for (let row = 0; row < 8; row++) {
      const rowElems: blessed.Widgets.BoxElement[] = [];
      for (let col = 0; col < 16; col++) {
        rowElems.push(this.addBoxAtGridPos(col, row));
      }
      boxes.push(rowElems);
    }
    this.boxes = boxes;

    this.screen.render();
  }

  refresh(led: number[][]) {
    if (led.length < 8) {
      throw new Error(
        `Invalid shape of argument to refresh: ${JSON.stringify(led)}`
      );
    }

    for (let row = 0; row < 8; row++) {
      if (led[row].length < 16) {
        throw new Error(
          `Invalid shape of argument to refresh: ${JSON.stringify(led)}`
        );
      }

      for (let col = 0; col < 16; col++) {
        let brightness = led[row][col];
        let color = brightnessToColor[brightness];
        if (color == null) {
          throw new Error(`Invalid brightness: ${brightness}`);
        }
        this.boxes[row][col].style.bg = color;
        this.boxes[row][col].setContent(`${brightness || ""}`);
      }
    }

    this.screen.render();
  }

  key(keyHandler: KeyHandler) {
    this.keyHandler = keyHandler;
  }

  private handleBoxMouseEvent(i: number, j: number, s: KeyState) {
    if (this.keyHandler) this.keyHandler(i, j, s);
  }

  private addBoxAtGridPos(col: number, row: number) {
    let box = blessed.box({
      width: 5,
      height: 4,
      left: 7 * col,
      top: 5 * row,
      border: {
        type: "line"
      },
      style: {
        bg: brightnessToColor[0],
        border: {
          fg: "white"
        }
      }
    });

    box.on("mousedown", () => {
      this.handleBoxMouseEvent(col, row, KeyState.Down);
    });

    box.on("mouseup", () => {
      this.handleBoxMouseEvent(col, row, KeyState.Up);
    });

    this.screen.append(box);
    return box;
  }
}

export default async function monomeGrid() {
  return new MonomeGridSimulator();
}
