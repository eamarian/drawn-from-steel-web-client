export function EntityMap<T, K extends keyof T>(
  entities: T[],
  key: K
): Map<T[K], T> {
  return new Map<T[K], T>(entities.map((entity: T) => [entity[key], entity]));
}

export function EntityMapConvert<T1, T2, K extends keyof T1>(
  entities: T1[],
  key: K,
  convert: (entity: T1) => T2
): Map<T1[K], T2> {
  return new Map<T1[K], T2>(
    entities.map((entity: T1) => [entity[key], convert(entity)])
  );
}
