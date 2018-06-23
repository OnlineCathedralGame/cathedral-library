
declare namespace CatLib {

  interface State {
    readonly player: -1 | 0 | 1;
    readonly grids: Grids;
    readonly selected: Piece;
    readonly available: Available;
    readonly socket: SocketIOClient.Socket;
  }

  type PieceGrid = ReadonlyArray<ReadonlyArray<Piece | null>>;
  type StructureGrid = ReadonlyArray<ReadonlyArray<State['player'] | null>>;
  type BorderGrid = ReadonlyArray<ReadonlyArray<ReadonlyArray<boolean> | null>>;

  interface Grids {
    readonly PieceGrid: PieceGrid;
    readonly StructureGrid: StructureGrid;
    readonly BorderGrid: BorderGrid;
  }

  interface Available {
    readonly [notation: string]: number;
  }

  interface Piece {
    readonly notation: string;
    readonly rotation: number;
    readonly location?: [number, number];
    readonly player: number;
    readonly structure: StructureGrid;
    readonly name: string;
    readonly size: number;
  }

  interface IsPieceValidGrids {
    readonly StructureGrid: StructureGrid;
    readonly PieceGrid: PieceGrid;
  }

  function EmptyMatrix (x: number): ReadonlyArray<ReadonlyArray<null>>;
  function insertPiece (grids: Grids, piece: Piece): Grids;
  function parseBorders (structure: StructureGrid): BorderGrid;
  function rotatePiece (piece: Piece): Piece;
  function territoryAssignment (StructureGrid: StructureGrid, PieceGrid: PieceGrid): StructureGrid;
  function validatePiece (grids: IsPieceValidGrids, piece: Piece, location: number[], attemptedRotations: number): {
    readonly validated: boolean,
    readonly validatedPiece: Piece
  };
}

export = CatLib;
