"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rotatePiece_1 = require("./rotatePiece");
const isPieceValid = (grids, piece, location) => {
    const [centreY, centreX] = location;
    const { StructureGrid } = grids;
    const { structure } = piece;
    const deviation = Math.floor(structure.length / 2);
    return structure.every((row, pieceY) => {
        const gridY = centreY - deviation + pieceY;
        return row.every((block, pieceX) => {
            const gridX = centreX - deviation + pieceX;
            const isOOB = StructureGrid[gridY] === undefined ||
                StructureGrid[gridY][gridX] === undefined;
            if (isOOB) {
                return block === null;
            }
            return StructureGrid[gridY][gridX] === null || block === null;
        });
    });
};
const validatePiece = (grids, piece, location, attemptedRotations = 0) => {
    if (isPieceValid(grids, piece, location)) {
        return { validated: true, validatedPiece: piece };
    }
    if (attemptedRotations === 3) {
        return { validated: false, validatedPiece: piece };
    }
    return validatePiece(grids, rotatePiece_1.default(piece), location, attemptedRotations + 1);
};
exports.default = validatePiece;
