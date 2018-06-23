"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseBorders = (structure) => {
    const maxCoord = structure.length - 1;
    return structure.map((row, y, structure) => row.map((piece, x) => (piece !== null ? [
        y === 0 || structure[y - 1][x] !== piece,
        x === maxCoord || structure[y][x + 1] !== piece,
        y === maxCoord || structure[y + 1][x] !== piece,
        x === 0 || structure[y][x - 1] !== piece,
    ] : null)));
};
exports.default = parseBorders;
