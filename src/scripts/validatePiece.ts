import { Piece, rotatePiece, StructureGrid } from '../../';

const isPieceValid = (grid: StructureGrid, piece: Piece, location: number[]): boolean => {

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

export const validatePiece = (
  grid: StructureGrid,
  piece: Piece,
  location: number[],
  attemptedRotations: number = 0
): Piece | void => {
  if (isPieceValid(grid, piece, location)) {
    return piece;
  }

  if (attemptedRotations === 3) {
    return;
  }

  return validatePiece(grid, rotatePiece(piece), location, attemptedRotations + 1);
};
