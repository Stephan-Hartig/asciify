import { priv } from '../../src/to-ascii/to-ascii';
import each from "jest-each";

const { subChar, simplify, toBlocks } = priv as any;


describe('.subChar()', () => {
   each([
      [
         "..\n. ",
         [
            [true, true],
            [true, false]
         ],
         "."
      ],
      [
         " ##\n# #",
         [
            [false, true, true],
            [true, false, true]
         ],
         "#"
      ],
   ]).test('', (expected, arr, char) => {
      expect(subChar(arr, char)).toEqual(expected);
   });
});
