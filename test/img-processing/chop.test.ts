import { chop, subChar, meanOverThreshold } from '../../src/img-processing/chop';
import each from 'jest-each';
import { Image } from 'image-js';

describe('`chop()`', () => {
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
      [
         "assets/rf_tux512x512.png", 40, 30
      ],
   ]).test("img [%s] divided into a %d x %d grid", async (imgPath, blocksX, blocksY) => {
      
      const img = (await Image.load(imgPath)).grey();
      const width = img.width;
      const height = img.height;
      const blocks = chop(img, blocksX, blocksY);
      
      /* Assert the grid of sub-images has the right dimensions. */
      expect(blocks.length).toEqual(blocksY);
      for (let row of blocks)
         expect(row.length).toEqual(blocksX);
      
      /* Assert the grid has the right types. */
      for (let row of blocks)
         for (let val of row)
            expect(val).toBeInstanceOf(Image);
      
      /* Check widths. */
      let totalWidths = new Array(blocksY).fill(0);
      for (let x = 0; x < blocksX; x++) {
         for (let y = 0; y < blocksY; y++) {
            totalWidths[y] += blocks[y][x].width;
         }
      }
      for (let totalWidth of totalWidths) {
         expect(totalWidth).toEqual(width);
      }
      
      /* Check heights. */
      let totalHeights = new Array(blocksX).fill(0);
      for (let x = 0; x < blocksX; x++) {
         for (let y = 0; y < blocksY; y++) {
            totalHeights[x] += blocks[y][x].height;
         }
      }
      for (let totalHeight of totalHeights) {
         expect(totalHeight).toEqual(height);
      }
   });
});

/* TODO: Custom images to test, otherwise it's just testing `chop`. */
describe('`meanOverThreshold()`', () => {
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
   ]).test("img [%s] divided into a %d x %d grid and tested by mean value", async (imgPath, blocksX, blocksY) => {
   
      const img = (await Image.load(imgPath)).grey();
      const blocks = meanOverThreshold(chop(img, blocksX, blocksY), 0.5);
   
      /* Assert the grid of boolean has the right dimensions. */
      expect(blocks.length).toEqual(blocksX);
      for (let row of blocks)
         expect(row.length).toEqual(blocksY);
      
      /* Assert the grid has the right types. */
      for (let row of blocks)
         for (let val of row)
            expect(typeof val).toEqual('boolean');
   });
});

describe('`subChar()`', () => {
   each([
      [
         [
            ['.', '.'],
            ['.', ' ']
         ],
         [
            [true, true],
            [true, false]
         ],
         "."
      ],
      [
         [
            [' ', '#', '#'],
            ['#', ' ', '#']
         ],
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
