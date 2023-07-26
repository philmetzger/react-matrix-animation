'use client';

import React, { useEffect } from 'react';

const CANVAS_ID = 'matrixCanvas';

interface Column {
    x: number;
    stackHeight: number;
    stackCounter: number;
}

type HEX = `#${string}`;
interface MatrixEffect {
    tileSize?: number; // Size of the character elements.
    fadeFactor?: number; // A higher fade factor will make the characters fade quicker.
    backgroundColor?: HEX; // Background color.
    fontColor?: HEX; // Font color.
}

const hexToRgb = (hexValue: HEX) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
};

const ReactMatrixAnimation = ({
    tileSize = 20,
    fadeFactor = 0.05,
    backgroundColor = '#030303',
    fontColor = '#008529',
}: MatrixEffect) => {
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    let columns: Column[] = [];
    let maxStackHeight: number;

    const rgbBackground = hexToRgb(backgroundColor);
    if (!rgbBackground) {
        throw new Error('Invalid background color. Use a hex value e.g. #030303');
    }

    const rgbFont = hexToRgb(fontColor);
    if (!rgbFont) {
        throw new Error('Invalid font color. Use a hex value e.g. #030303');
    }

    function init() {
        canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
        ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.contentBoxSize) {
                    // Firefox implements `contentBoxSize` as a single content rect, rather than an array.
                    // const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;

                    const boundingClientRect = canvas.getBoundingClientRect();
                    canvas.width = boundingClientRect.width;
                    canvas.height = boundingClientRect.height;

                    // canvas.width = contentBoxSize.inlineSize;
                    // canvas.height = window.innerHeight;

                    initMatrix();
                }
            });
        });

        // Observe the size of the document.
        resizeObserver.observe(document.documentElement);

        // Start the main loop.
        tick();
    }

    function initMatrix() {
        columns = [];

        maxStackHeight = Math.ceil(canvas.height / tileSize);

        // Divide the canvas into columns.
        for (let i = 0; i < canvas.width / tileSize; ++i) {
            const column = {} as Column;

            // Save the x position of the column.
            column.x = i * tileSize;

            // Create a random stack height for the column.
            column.stackHeight = 10 + Math.random() * maxStackHeight;

            // Add a counter to count the stack height.
            column.stackCounter = 0;

            // Add the column to the list.
            columns.push(column);
        }
    }

    function draw() {
        // Draw a semi transparent black rectangle on top of the scene to slowly fade older characters.
        ctx.fillStyle = `rgba(${rgbBackground?.r ?? 3}, ${rgbBackground?.g ?? 3}, ${rgbBackground?.b ?? 3}, ${fadeFactor})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${tileSize - 2}px monospace`;
        ctx.fillStyle = `rgb(${rgbFont?.r ?? 0}, ${rgbFont?.g ?? 133}, ${rgbFont?.b ?? 41})`;

        for (let i = 0; i < columns.length; ++i) {
            // Pick a random ascii character (change the 94 to a higher number to include more characters).
            const randomCharacter = String.fromCharCode(33 + Math.floor(Math.random() * 94));
            ctx.fillText(randomCharacter, columns[i].x, columns[i].stackCounter * tileSize + tileSize);

            // If the stack is at its height limit, pick a new random height and reset the counter.
            if (++columns[i].stackCounter >= columns[i].stackHeight) {
                columns[i].stackHeight = 10 + Math.random() * maxStackHeight;
                columns[i].stackCounter = 0;
            }
        }
    }

    function tick() {
        draw();
        setTimeout(tick, 100);
    }

    useEffect(() => {
        init();
    }, []);

    return <canvas id={CANVAS_ID} style={{ width: '100%', height: '100%' }} />;
};

export default ReactMatrixAnimation;
