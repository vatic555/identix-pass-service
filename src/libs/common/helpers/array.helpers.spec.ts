import { randomFromArray } from "./array.helpers";

describe('Array helpers', () => {
  it('randomFromArray should return Math.random() element', () => {
    Math.random = () => 0.65156;
    const arr = ['a', 'b', 'c', 'd'];
    expect(randomFromArray(arr)).toBe('c');
  });
});