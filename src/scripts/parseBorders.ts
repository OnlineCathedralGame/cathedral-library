import { BorderGrid, Piece } from '../../';

export const parseBorders = (structure: Piece['structure']): BorderGrid => {
  const maxCoord = structure.length - 1;

  return structure.map((row, y, structure) => row.map((piece, x) => (
    piece !== null ? [
      y === 0 || structure[y - 1][x] !== piece,        // up
      x === maxCoord || structure[y][x + 1] !== piece, // right
      y === maxCoord || structure[y + 1][x] !== piece, // down
      x === 0 || structure[y][x - 1] !== piece,        // left
    ] : null
  )));
};
