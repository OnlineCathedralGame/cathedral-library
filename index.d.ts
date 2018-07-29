export * from './src';
// export * from './types';

export interface State {
  readonly player: -1 | 0 | 1;
  readonly pieces: Piece[];
  readonly selected: Piece;
  readonly available: Available;
  readonly socket: SocketIOClient.Socket;
  readonly move: -1 | 1;
}

export type Grid<T> = ReadonlyArray<ReadonlyArray<T>>;

export type PieceGrid = Grid<Piece | null>;
export type StructureGrid = Grid<State['player'] | null>;
export type BorderGrid = Grid<ReadonlyArray<boolean> | null>;

export interface Grids {
  readonly PieceGrid: PieceGrid;
  readonly StructureGrid: StructureGrid;
  readonly BorderGrid: BorderGrid;
}

export interface Available {
  readonly [notation: string]: number;
}

export interface Piece {
  readonly notation: string;
  readonly rotation: number;
  readonly location: number[];
  readonly player: number;
  readonly removable: boolean;
  readonly structure: StructureGrid;
  readonly borders: BorderGrid;
  readonly name: string;
  readonly size: number;
}
