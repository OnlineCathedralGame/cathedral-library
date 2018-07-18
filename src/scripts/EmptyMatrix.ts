// tslint:disable-next-line:no-any
export const EmptyMatrix = (x: number): ReadonlyArray<ReadonlyArray<null>> =>
  Array.from({ length: x }, () =>
    Array.from({ length: x }, () => null )
  );
