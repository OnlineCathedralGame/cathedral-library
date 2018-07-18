"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
exports.handlePlacement = (grid, piece, clickLocation) => new Promise((resolve, reject) => {
    if (piece.notation === '') {
        return reject(new Error('Please, select a piece!'));
    }
    const sameLocation = clickLocation.every((v, i) => v === piece.location[i]);
    const validatedPiece = __1.validatePiece(grid, sameLocation ? __1.rotatePiece(piece) : piece, clickLocation);
    return resolve(validatedPiece ? Object.assign({}, validatedPiece, { location: clickLocation }) : Object.assign({}, piece, { location: [] }));
});
