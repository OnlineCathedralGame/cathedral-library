
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
  type VisualGrid = StructureGrid;

  interface Grids {
    readonly PieceGrid: PieceGrid;
    readonly StructureGrid: StructureGrid;
    readonly BorderGrid: BorderGrid;
    readonly VisualGrid: VisualGrid;
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

  function EmptyMatrix (x: number): ReadonlyArray<ReadonlyArray<null>>;

}

export = CatLib;
