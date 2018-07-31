"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
exports.rotatePiece = (piece, rotations = 1) => {
    const { structure, rotation } = piece;
    if (rotations === 0) {
        return piece;
    }
    const rotatedStructure = rotateGrid(structure);
    const rotatedPiece = Object.assign({}, piece, { structure: rotatedStructure, borders: __1.parseBorders(rotatedStructure), rotation: (rotation + 1) % 4 });
    return exports.rotatePiece(rotatedPiece, rotations - 1);
};
const rotateGrid = (grid) => grid.map((row, i) => row.map((val, j) => grid[grid.length - 1 - j][i]));
