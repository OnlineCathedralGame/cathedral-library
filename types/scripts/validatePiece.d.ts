import { Piece } from '../../';
export declare const validatePiece: (grid: ReadonlyArray<ReadonlyArray<0 | 1 | -1 | null>>, piece: Piece, location: number[], attemptedRotations?: number) => void | Piece;
