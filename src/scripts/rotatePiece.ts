import { Grid, parseBorders, Piece } from '../../';

export const rotatePiece = (piece: Piece, rotations = 1): Piece => {
  const { structure, rotation } = piece;

  if (rotations === 0) {
    return piece;
  }

  const rotatedStructure = rotateGrid(structure);

  const rotatedPiece = {
    ...piece,
    structure: rotatedStructure,
    borders: parseBorders(rotatedStructure),
    rotation: (rotation  + 1) % 4,
  };

  return rotatePiece(rotatedPiece, rotations - 1);
};

const rotateGrid = (grid: Grid) => grid.map((row, i) =>
  row.map((val, j) => grid[grid.length - 1 - j][i])
);
