import { InvalidMoves, Piece, rotatePiece, StructureGrid } from '../../';

const isPieceValid = (grid: StructureGrid, piece: Piece, location: number[], firstMove = false): boolean => {

  const [centreY, centreX] = location;
  const { notation, rotation, structure } = piece;

  if (firstMove) {
    const invLocations = InvalidMoves.get(
      notation === 'ab' || notation === 'ac' ? `${notation}${piece.player}` : notation
    );
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

export const validatePiece = (
  grid: StructureGrid,
  piece: Piece,
  location: number[],
  attemptedRotations = 0,
  firstMove = false
): Piece | void => {
  if (isPieceValid(grid, piece, location, firstMove)) {
    return { ...piece, location};
  }

  if (attemptedRotations === 3) {
    return;
  }

  return validatePiece(grid, rotatePiece(piece), location, attemptedRotations + 1, firstMove);
};
