import * as foo from '../../src/to-ascii/foo';
import each from "jest-each";



describe('.add()', () => {
   each([
      [3, 1, 2],
      [3, 2, 1],
      [5, 2, 3],
      [0, 1, -1]
   ]).test('%s = %s + %s', (expected, a, b) => {
      expect(foo.sum(a, b)).toBe(expected);
   });
});
