// tslint:disable-next-line:no-any
import { Grid } from '../../';

export const EmptyMatrix = (n: number): Grid<null> =>
  Array.from({ length: n }, () =>
    Array.from({ length: n }, () => null )
  );
