import { Grid } from '../../';

export const EmptyMatrix = (n: number): Grid<null> => Array(n).fill(undefined).map(() => Array(n).fill(null));
