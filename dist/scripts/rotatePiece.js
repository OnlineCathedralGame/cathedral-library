"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotatePiece = (piece, rotations = 1) => {
    const { structure, rotation } = piece;
    const length = structure.length - 1;
    if (rotations === 0) {
        return piece;
    }
    const rotatedPiece = Object.assign({}, piece, { structure: structure.map((row, i) => row.map((val, j) => structure[length - j][i])), rotation: (rotation + 1) % 4 });
    return exports.rotatePiece(rotatedPiece, rotations - 1);
};
