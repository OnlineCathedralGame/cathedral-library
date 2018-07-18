// tslint:disable-next-line:no-any
import { Grid } from '../../';

export const EmptyMatrix = (x: number): Grid<null> =>
  Array.from({ length: x }, () =>
    Array.from({ length: x }, () => null )
  );
