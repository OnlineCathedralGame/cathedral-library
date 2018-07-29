// tslint:disable: no-object-mutation
import { Grids, Piece, StructureGrid } from '../../';

let alpha = 0;

type zoneArray = Array<[number, number, boolean]>;
type Grid = Array<Array<number | null>>;

let zoneArrayP1: zoneArray = [];
let zoneArrayP2: zoneArray = [];

const floodFill = (
  board: Grid,
  pieces: Piece[],
  x: number,
  y: number,
  target: number,
  replacement: number
) => {

  let b: Grid = board.map((row) => [...row]);
  const block = b[y][x];

  if (block !== target && block !== null && block !== 0) {
    return b;
  }
  alpha++;
  b[y][x] = replacement;

  if (target === -1) {
    if (!zoneArrayP1[replacement]) {
      zoneArrayP1[replacement] = [0, 0, true];
    }
    zoneArrayP1[replacement][0]++;
    if (pieces.some((piece) => piece.player === target || piece.player === 0)) {
      zoneArrayP1[replacement][1]++;
    }
    if (zoneArrayP1[replacement][0] > 49 || zoneArrayP1[replacement][1] > 1) {
      zoneArrayP1[replacement][2] = false;
    }
  }
  if (target === +1) {
    if (!zoneArrayP2[replacement]) {
      zoneArrayP2[replacement] = [0, 0, true];
    }
    zoneArrayP2[replacement][0]++;
    if (pieces.some((piece) => piece.player === target || piece.player === 0)) {
      zoneArrayP2[replacement][1]++;
    }
    if (zoneArrayP2[replacement][0] > 49 || zoneArrayP2[replacement][1] > 1) {
      zoneArrayP2[replacement][2] = false;
    }
  }

  if (x !== 0           ) { b = floodFill(b, pieces, x - 1, y    , target, replacement); }
  if (x !== 0 && y !== 0) { b = floodFill(b, pieces, x - 1, y - 1, target, replacement); }
  if (           y !== 0) { b = floodFill(b, pieces, x    , y - 1, target, replacement); }
  if (x !== 0 && y !== 9) { b = floodFill(b, pieces, x - 1, y + 1, target, replacement); }
  if (           y !== 9) { b = floodFill(b, pieces, x    , y + 1, target, replacement); }
  if (x !== 9 && y !== 9) { b = floodFill(b, pieces, x + 1, y + 1, target, replacement); }
  if (x !== 9           ) { b = floodFill(b, pieces, x + 1, y    , target, replacement); }
  if (x !== 9 && y !== 0) { b = floodFill(b, pieces, x + 1, y - 1, target, replacement); }

  return b;
};

const regionAssignment = (board: StructureGrid, pieces: Piece[], target: -1 | 1, beta: number) => {
  const b: Grid = board.map((row) => [...row]);
  alpha = 0;
  const floodFill = configureFloodFill(board as Grid, pieces);

  for (let y = 0, c = 2; y < 10; y++) {
    for (let x = 0; x < 10; x++, c += 2) {
        floodFill(x, y, target, c);
        if (alpha >= 100 - beta) { return b as number[][]; }
    }
  }
  return b as number[][];
};

export const territoryAssignment = (grids: Grids, pieces: Piece[]): {
  readonly removablePieces: Piece[],
  readonly grids: Grids,
} => {
  const { StructureGrid } = grids;
  zoneArrayP1 = [];
  zoneArrayP2 = [];

  const beta = pieces.reduce((beta, piece) => beta + piece.size, 0);

  const t1 = regionAssignment(StructureGrid, pieces, -1, beta);
  const t2 = regionAssignment(StructureGrid, pieces, +1, beta);

  const removablePieces: Piece[] = [];

  const newStructureGrid = StructureGrid.map((row, y) =>
    row.map((block, x) => {
      const p1Val = t1[y][x];
      const p2Val = t2[y][x];

      if ((p1Val > 1 && zoneArrayP1[p1Val][2]) || p1Val === +1) {
        const piece = pieces.find((piece) => piece.location[0] === y && piece.location[1] === x);
        if (piece && piece.player !== 1) {
          removablePieces.push(piece);
        }
        return 1;
      }

      if ((p2Val > 1 && zoneArrayP2[p2Val][2]) || p2Val === -1) {
        const piece = pieces.find((piece) => piece.location[0] === y && piece.location[1] === x);
        if (piece && piece.player !== -1) {
          removablePieces.push(piece);
        }
        return -1;
      }

      if (block === 0) {
        return 0;
      }

      return null;
    })
  );

  return {
    removablePieces,
    grids: {
      ...grids,
      StructureGrid: newStructureGrid,
    },
  };
};

const configureFloodFill = (b: Grid, p: Piece[]) => {
  const floodFill = (x: number, y: number, target: number, replacement: number): void => {
    const block = b[y][x];

    if (block !== target && block !== null && block !== 0) {
      return;
    }
    alpha++;
    b[y][x] = replacement;

    if (target === -1) {
      if (!zoneArrayP1[replacement]) {
        zoneArrayP1[replacement] = [0, 0, true];
      }
      zoneArrayP1[replacement][0]++;
      if (p.some((piece) => piece.player === target || piece.player === 0)) {
        zoneArrayP1[replacement][1]++;
      }
      if (zoneArrayP1[replacement][0] > 49 || zoneArrayP1[replacement][1] > 1) {
        zoneArrayP1[replacement][2] = false;
      }
    }
    if (target === +1) {
      if (!zoneArrayP2[replacement]) {
        zoneArrayP2[replacement] = [0, 0, true];
      }
      zoneArrayP2[replacement][0]++;
      if (p.some((piece) => piece.player === target || piece.player === 0)) {
        zoneArrayP2[replacement][1]++;
      }
      if (zoneArrayP2[replacement][0] > 49 || zoneArrayP2[replacement][1] > 1) {
        zoneArrayP2[replacement][2] = false;
      }
    }

    if (x !== 0           ) { floodFill(x - 1,    y,     target, replacement); }
    if (x !== 0 && y !== 0) { floodFill(x - 1, y - 1, target, replacement); }
    if            (y !== 0) { floodFill(   x,     y - 1, target, replacement); }
    if (x !== 0 && y !== 9) { floodFill(x - 1, y + 1, target, replacement); }
    if (           y !== 9) { floodFill(   x,     y + 1, target, replacement); }
    if (x !== 9 && y !== 9) { floodFill(x + 1, y + 1, target, replacement); }
    if (x !== 9           ) { floodFill(x + 1,    y,     target, replacement); }
    if (x !== 9 && y !== 0) { floodFill(x + 1, y - 1, target, replacement); }
  };
  return floodFill;
};
