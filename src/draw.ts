export const draw = {
    /**
     * Draws a path on a canvas context using the provided coordinates and color.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     * @param {number[][]} path - An array of coordinate pairs representing the path.
     * @param {string} [color="black"] - The color of the path. Defaults to black.
     */
    path(ctx: CanvasRenderingContext2D, path: number[][], color: string = "black") {
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.beginPath();
        const [x, y] = path[0];
        ctx.moveTo(x, y);
        for (let i = 0; i < path.length; i++) {
            const [x, y] = path[i];
            ctx.lineTo(x, y)
        }
        ctx.stroke();
    },
    /**
     * Draws multiple paths on a canvas.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {number[][][]} paths - An array of paths, where each path is an array of numbers representing coordinates.
     * @param {string} [color="black"] - The color of the paths. Defaults to black.
     */
    paths(ctx: CanvasRenderingContext2D, paths: number[][][], color: string = "black") {
        for (const _path of paths) {
            draw.path(ctx, _path, color)
        }
    }

}

export const data: {
    student: null | string;
    session: number;
    drawings: { [key: string]: number[][][] };
} = {
    student: null,
    session: new Date().getTime(),
    drawings: {}
}