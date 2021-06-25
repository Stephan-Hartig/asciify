import { priv } from '../../src/to-ascii/to-ascii';
import each from 'jest-each';
import { Image } from 'image-js';

const { subChar, simplify, toBlocks } = priv as any;

describe('toBlocks()', () => {
   each([
      [
         "assets/rf_bird512x512.png", 4, 4
      ],
      [
         "assets/rf_bird512x512.png", 5, 5
      ],
      [
         "assets/rf_flower400x300.jpg", 4, 4
      ],
   ]).test("img [%s] divided into a %d x %d grid", async (imgPath, blocksX, blocksY) => {
      
      const img = (await Image.load(imgPath)).grey();
      const width = img.width;
      const height = img.height;
      const blocks = toBlocks(img, blocksX, blocksY);
      
      /* Assert the grid of sub-images has the right dimensions. */
      expect(blocks.length).toEqual(blocksX);
      for (let row of blocks)
         expect(row.length).toEqual(blocksY);
      
      /* Assert the grid has the right types. */
      for (let row of blocks)
         for (let val of row)
            expect(val).toBeInstanceOf(Image);
      
      /* Check widths. */
      let totalWidths = new Array(blocksY).fill(0);
      for (let x = 0; x < blocksX; x++) {
         for (let y = 0; y < blocksY; y++) {
            totalWidths[y] += blocks[x][y].width;
         }
      }
      for (let totalWidth of totalWidths) {
         expect(totalWidth).toEqual(width);
      }
      
      
      /* Check heights. */
      let totalHeights = new Array(blocksX).fill(0);
      for (let x = 0; x < blocksX; x++) {
         for (let y = 0; y < blocksY; y++) {
            totalHeights[x] += blocks[x][y].height;
         }
      }
      for (let totalHeight of totalHeights) {
         expect(totalHeight).toEqual(height);
      }
   });
});

describe('simplify()', () => {
   each([
      [
         "assets/rf_bird512x512.png", 4, 4
      ],
      [
         "assets/rf_bird512x512.png", 5, 5
      ],
      [
         "assets/rf_flower400x300.jpg", 4, 4
      ],
   ]).test("img [%s] divided into a %d x %d grid", async (imgPath, blocksX, blocksY) => {
   
      const img = (await Image.load(imgPath)).grey();
      const width = img.width;
      const height = img.height;
      const blocks = simplify(img, blocksX, blocksY);
   
      /* Assert the grid of sub-images has the right dimensions. */
      expect(blocks.length).toEqual(blocksX);
      for (let row of blocks)
         expect(row.length).toEqual(blocksY);
      
      /* Assert the grid has the right types. */
      for (let row of blocks)
         for (let val of row)
            expect(typeof val).toEqual('boolean');
   
      /* Check widths. */
      let totalWidths = new Array(blocksY).fill(0);
      for (let x = 0; x < blocksX; x++) {
         for (let y = 0; y < blocksY; y++) {
            totalWidths[y] += blocks[x][y].width;
         }
      }
      for (let totalWidth of totalWidths) {
         expect(totalWidth).toEqual(width);
      }
   
   
      /* Check heights. */
      let totalHeights = new Array(blocksX).fill(0);
      for (let x = 0; x < blocksX; x++) {
         for (let y = 0; y < blocksY; y++) {
            totalHeights[x] += blocks[x][y].height;
         }
      }
      for (let totalHeight of totalHeights) {
         expect(totalHeight).toEqual(height);
      }
   });
});

describe('subChar()', () => {
   each([
      [
         '..\n. ',
         [
            [true, true],
            [true, false]
         ],
         "."
      ],
      [
         ' ##\n# #',
         [
            [false, true, true],
            [true, false, true]
         ],
         '#'
      ],
   ]).test('expect "%s" from %s and %s', (expected, arr, char) => {
      expect(subChar(arr, char)).toEqual(expected);
   });
});
