// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function get(obj: any, path: string|string[]): any {
  if (typeof path === "string") path = path.split(".").filter(key => key.length);
  return path.reduce((dive, key) => dive && dive[key], obj);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function set<T>(obj: T, path: any, value: unknown): T {
  if (Object(obj) !== obj) return obj;

  if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
  path.slice(0,-1).reduce((a, c, i) =>
      Object(a[c]) === a[c]
        ? a[c]
        : a[c] = Math.abs(path[i+1])>>0 === +path[i+1]
        ? []
        : {},
    obj)[path[path.length-1]] = value;
  return obj;
}

export async function sortABC(obj: any, field: string): Promise<any> {
  return obj.sort((a: any, b: any) => a[field] > b[field] ? 1 : -1);
}

export async function sortCBA(obj: any, field: string): Promise<any> {
  return obj.sort((a: any, b: any) => a[field] < b[field] ? 1 : -1);
}