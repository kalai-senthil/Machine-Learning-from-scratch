import { data, draw } from "./draw";
import "./style.scss"
export class SketchPad {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    paths: number[][][] = [];
    isDrawing: boolean = false;
    undoButton: HTMLButtonElement;
    objectsToDraw: string[];
    index: number;
    constructor(container: HTMLElement, undoButton: HTMLButtonElement, objectsToDraw: string[], size: number = 600) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.index = 0;
        container.style.display = "none"
        container.appendChild(this.canvas)
        this.ctx = this.canvas.getContext("2d")!
        this.isDrawing = false
        this.objectsToDraw = objectsToDraw;
        this.undoButton = undoButton;
        undoButton.disabled = true
        this.paths = []
        this.#addEventListeners();
    }
    next() {
        data.drawings[this.objectsToDraw[this.index]] = this.paths
        this.index++;
        return this.index < this.objectsToDraw.length;
    }
    prev() {
        delete data.drawings[this.objectsToDraw[this.index]];
        this.index--;
        return this.index > 0;
    }
    reset() {
        this.paths = [];
        this.#reDraw();
        this.isDrawing = false;
    }
    undo() {
        this.paths.pop()
        this.#reDraw()
    }
    #getMousePosition(event: MouseEvent | Touch) {
        const react = this.canvas.getBoundingClientRect();
        const mouse = [Math.round(event.clientX - react.left), Math.round(event.clientY - react.top)]
        return mouse
    }
    #reDraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        draw.paths(this.ctx, this.paths)
        if (this.paths.length === 0) {
            this.undoButton.disabled = true;
            return
        }
        this.undoButton.disabled = false;
    }
    #mouseDown(event: MouseEvent | Touch) {
        const mousePos = this.#getMousePosition(event)
        this.paths.push([mousePos])
        this.isDrawing = true;
    }
    #mouseMove(event: MouseEvent | Touch) {
        if (!this.isDrawing) return
        const mousePos = this.#getMousePosition(event)
        const lastPoint = this.paths[this.paths.length - 1];
        lastPoint.push(mousePos)
        this.#reDraw()
    }
    #mouseUp() {
        this.isDrawing = false;
    }
    #addEventListeners() {
        this.undoButton.addEventListener("click", () => {
            this.undo()
        })
        this.canvas.addEventListener("mousedown", (event) => {
            this.#mouseDown(event)
        })
        this.canvas.addEventListener("mousemove", (event) => {
            this.#mouseMove(event)
        })
        document.addEventListener("mouseup", () => {
            this.#mouseUp()
        })
        this.canvas.addEventListener("touchstart", (event) => {
            this.#mouseDown(event.touches[0])
        })
        this.canvas.addEventListener("touchmove", (event) => {
            this.#mouseMove(event.touches[0])
        })
        document.addEventListener("touchend", () => {
            this.#mouseUp()
        })
    }
}

