export function randomFromArray<T>(arr: T[]): T {
    return arr[Math.trunc(Math.random() * arr.length) | 0];
}

export function isArrayEmpty<T>(arr: T[]): boolean {
    return !arr || !Array.isArray(arr) || arr.length === 0;
}