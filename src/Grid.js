import React, { useEffect, useState } from 'react';
import './Grid.css';

// Define each letter with a clearer shape (5x5 grid for each letter)
const letters = {
    H: [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
    ],
    E: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
    ],
    L: [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1],
    ],
    O: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
    ],
};

// Map the word "HELLO" into the grid format, centering the pattern vertically
const createHelloPattern = (rows, cols, offset) => {
    const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
    const lettersArray = ['H', 'E', 'L', 'L', 'O'];

    // Set the starting position for the text
    let colStart = offset;

    lettersArray.forEach((letter) => {
        const letterPattern = letters[letter];
        const letterRows = letterPattern.length;
        const letterCols = letterPattern[0].length;

        // Place each letter in the grid
        for (let i = 0; i < letterRows; i++) {
            for (let j = 0; j < letterCols; j++) {
                // Center letters vertically, and handle horizontal offset
                const rowPos = i + Math.floor((rows - letterRows) / 2);
                const colPos = (j + colStart) % cols;
                if (letterPattern[i][j] === 1) {
                    grid[rowPos][colPos] = 1;
                }
            }
        }

        // Move starting position for the next letter with a bit of space in between
        colStart += letterCols + 2;
    });

    return grid;
};


const Grid = ({ rows = 15, cols = 20 }) => {
    const [grid, setGrid] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const movePattern = () => {
            setGrid(createHelloPattern(rows, cols, offset));
            setOffset((prev) => (prev + 1) % cols); // Update offset for scrolling effect
        };

        const interval = setInterval(movePattern, 300); // Adjust speed as needed

        return () => clearInterval(interval);
    }, [rows, cols, offset]);

    return (
        <div className="grid-container">
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        className="grid-cell"
                        style={{ backgroundColor: cell ? 'red' : '#333' }}
                    />
                ))
            )}
        </div>
    );
};

export default Grid;
