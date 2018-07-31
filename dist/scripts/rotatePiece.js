"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotatePiece = (piece, rotations = 1) => {
    const { borders, structure, rotation } = piece;
    if (rotations === 0) {
        return piece;
    }
    const rotatedPiece = Object.assign({}, piece, { structure: rotateGrid(structure), borders: rotateGrid(borders), rotation: (rotation + 1) % 4 });
    return exports.rotatePiece(rotatedPiece, rotations - 1);
};
const rotateGrid = (grid) => grid.map((row, i) => row.map((val, j) => grid[grid.length - 1 - j][i]));
