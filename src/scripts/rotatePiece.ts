import { Piece } from '../../';

export const rotatePiece = (piece: Piece, rotations = 1): Piece => {
  const { structure, rotation } = piece;
  const length = structure.length - 1;

  if (rotations === 0) {
    return piece;
  }

  const rotatedPiece = {
    ...piece,
    structure: structure.map((row, i) =>
      row.map((val, j) => structure[length - j][i])
    ),
    rotation: (rotation  + 1) % 4,
  };

  return rotatePiece(rotatedPiece, rotations - 1);
};
