// tslint:disable: no-object-mutation
import { PieceGrid, StructureGrid } from '../../';

let alpha = 0;

type zoneArray = Array<[number, number, boolean]>;
type Grid = Array<Array<number | null>>;

let zoneArrayP1: zoneArray = [];
let zoneArrayP2: zoneArray = [];

const floodFill = (
  board: Grid,
  pieceGrid: PieceGrid,
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

  const piece = pieceGrid[y][x];

  if (target === -1) {
    if (!zoneArrayP1[replacement]) {
      zoneArrayP1[replacement] = [0, 0, true];
    }
    zoneArrayP1[replacement][0]++;
    if (piece && (piece.player === target || piece.player === 0)) {
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
    if (piece && (piece.player === target || piece.player === 0)) {
      zoneArrayP2[replacement][1]++;
    }
    if (zoneArrayP2[replacement][0] > 49 || zoneArrayP2[replacement][1] > 1) {
      zoneArrayP2[replacement][2] = false;
    }
  }

  if (x !== 0           ) { b = floodFill(b, pieceGrid, x - 1, y    , target, replacement); }
  if (x !== 0 && y !== 0) { b = floodFill(b, pieceGrid, x - 1, y - 1, target, replacement); }
  if (           y !== 0) { b = floodFill(b, pieceGrid, x    , y - 1, target, replacement); }
  if (x !== 0 && y !== 9) { b = floodFill(b, pieceGrid, x - 1, y + 1, target, replacement); }
  if (           y !== 9) { b = floodFill(b, pieceGrid, x    , y + 1, target, replacement); }
  if (x !== 9 && y !== 9) { b = floodFill(b, pieceGrid, x + 1, y + 1, target, replacement); }
  if (x !== 9           ) { b = floodFill(b, pieceGrid, x + 1, y    , target, replacement); }
  if (x !== 9 && y !== 0) { b = floodFill(b, pieceGrid, x + 1, y - 1, target, replacement); }

  return b;
};

const regionAssignment = (board: StructureGrid, pieceGrid: PieceGrid, target: -1 | 1, beta: number) => {
  let b: Grid = board.map((row) => [...row]);
  alpha = 0;

  for (let y = 0, c = 2; y < 10; y++) {
    for (let x = 0; x < 10; x++, c += 2) {
      b = floodFill(b, pieceGrid, x, y, target, c);
      if (alpha >= 100 - beta) { return b as number[][]; }
    }
  }
  return b as number[][];
};

export const territoryAssignment = ( StructureGrid: StructureGrid, PieceGrid: PieceGrid) => {
  zoneArrayP1 = [];
  zoneArrayP2 = [];

  const beta = StructureGrid.reduce((count, row) =>
    count + row.filter((block) =>
      block !== null
    ).length, 0);

  const t1 = regionAssignment(StructureGrid, PieceGrid, -1, beta);
  const t2 = regionAssignment(StructureGrid, PieceGrid, +1, beta);

  return StructureGrid.map((row, y) =>
    row.map((block, x) => {
      const p1Val = t1[y][x];
      const p2Val = t2[y][x];

      if ((p1Val > 1 && zoneArrayP1[p1Val][2]) || p1Val === +1) {
        return 1;
      }

      if ((p2Val > 1 && zoneArrayP2[p2Val][2]) || p2Val === -1) {
        return -1;
      }

      if (block === 0) {
        return 0;
      }

      return null;
    })
  );
};
