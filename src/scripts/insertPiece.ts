import { Grid, Grids, parseBorders, Piece, territoryAssignment } from '../../';

const insertInGrid = <T>(
  grid: Grid<T>,
  item: Grid<T>,
  location: number[]
): Grid<T> => {
  const [centreY, centreX] = location;
  const deviation = Math.floor(item.length / 2);

  return grid.map((row, gridY) => {
    if (gridY < centreY - deviation || gridY > centreY + deviation) {
      return row;
    }
    const pieceY = gridY - centreY + deviation;
    return row.map((block, gridX) => {
      if (gridX < centreX - deviation || gridX > centreX + deviation) {
        return block;
      }
      const pieceX = gridX - centreX + deviation;
      return item[pieceY][pieceX] === null ? block : item[pieceY][pieceX];
    });
  });
};

export const insertPiece = (grids: Grids, piece: Piece): Grids => {
  const { StructureGrid, PieceGrid, BorderGrid } = grids;
  const { structure, location } = piece;
  const borders = parseBorders(structure);

  if (location.length === 0) {
    return grids;
  }

  const newStructureGrid = insertInGrid(StructureGrid, structure, location);

  const newPieceGrid = insertInGrid(PieceGrid, [[piece]], location);

  const newBorderGrid = insertInGrid(BorderGrid, borders, location);

  return {
    StructureGrid: territoryAssignment(newStructureGrid, newPieceGrid),
    PieceGrid: newPieceGrid,
    BorderGrid: newBorderGrid,
  };
};
