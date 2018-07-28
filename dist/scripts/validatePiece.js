"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const isPieceValid = (grid, piece, location) => {
    const [centreY, centreX] = location;
    const { structure } = piece;
    const deviation = Math.floor(structure.length / 2);
    return structure.every((row, pieceY) => {
        const gridY = centreY - deviation + pieceY;
        return row.every((block, pieceX) => {
            const gridX = centreX - deviation + pieceX;
            const isOOB = grid[gridY] === undefined ||
                grid[gridY][gridX] === undefined;
            if (isOOB) {
                return block === null;
            }
            return grid[gridY][gridX] === null || block === null;
        });
    });
};
exports.validatePiece = (grid, piece, location, attemptedRotations = 0) => {
    if (isPieceValid(grid, piece, location)) {
        return piece;
    }
    if (attemptedRotations === 3) {
        return;
    }
    return exports.validatePiece(grid, __1.rotatePiece(piece), location, attemptedRotations + 1);
};
