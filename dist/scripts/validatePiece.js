"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const isPieceValid = (grid, piece, location, firstMove = false) => {
    const [centreY, centreX] = location;
    const { notation, rotation, structure } = piece;
    if (firstMove) {
        const invLocations = __1.InvalidMoves.get(notation === 'ab' || notation === 'ac' ? `${notation}${piece.player}` : notation);
        if (invLocations) {
            const invRotations = invLocations.get(location.join());
            if (invRotations && invRotations.includes(rotation)) {
                return false;
            }
        }
    }
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
exports.validatePiece = (grid, piece, location, attemptedRotations = 0, firstMove = false) => {
    if (isPieceValid(grid, piece, location, firstMove)) {
        return Object.assign({}, piece, { location });
    }
    if (attemptedRotations === 3) {
        return;
    }
    return exports.validatePiece(grid, __1.rotatePiece(piece), location, attemptedRotations + 1, firstMove);
};
