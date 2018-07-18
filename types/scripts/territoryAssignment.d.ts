import { Piece } from '../../';

export declare const territoryAssignment: (StructureGrid: ReadonlyArray<ReadonlyArray<0 | 1 | -1 | null>>, PieceGrid: ReadonlyArray<ReadonlyArray<Piece | null>>) => (1 | -1 | 0 | null)[][];
