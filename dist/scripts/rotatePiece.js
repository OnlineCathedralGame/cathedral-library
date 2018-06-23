"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rotatePiece = (piece) => {
    const { structure, rotation } = piece;
    const length = structure.length - 1;
    return Object.assign({}, piece, { structure: structure.map((row, i) => row.map((val, j) => structure[length - j][i])), rotation: rotation === 3 ? 0 : rotation + 1 });
};
exports.default = rotatePiece;
