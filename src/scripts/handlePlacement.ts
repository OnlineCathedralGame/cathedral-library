import { Piece, rotatePiece, StructureGrid, validatePiece } from '../../';

export const handlePlacement = (
  grid: StructureGrid,
  piece: Piece,
  clickLocation: Piece['location']
): Promise<Piece> => new Promise((resolve, reject) => {
  if (piece.notation === '') {
    return reject(new Error('Please, select a piece!'));
  }

  const sameLocation = clickLocation.every((v, i) => v === piece.location[i]);

  const validatedPiece = validatePiece(
    grid,
    sameLocation ? rotatePiece(piece) : piece,
    clickLocation
  );

  return resolve( validatedPiece ? {...validatedPiece, location: clickLocation} : {...piece, location: []});
});
