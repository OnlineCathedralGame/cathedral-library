import { Grid, Piece } from '../../';

export const rotatePiece = (piece: Piece, rotations = 1): Piece => {
  const { borders, structure, rotation } = piece;

  if (rotations === 0) {
    return piece;
  }

  const rotatedPiece = {
    ...piece,
    structure: rotateGrid(structure),
    borders: rotateGrid(borders),
    rotation: (rotation  + 1) % 4,
  };

  return rotatePiece(rotatedPiece, rotations - 1);
};

const rotateGrid = (grid: Grid) => grid.map((row, i) =>
  row.map((val, j) => grid[grid.length - 1 - j][i])
);
