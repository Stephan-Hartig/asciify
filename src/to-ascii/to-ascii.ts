import {Image, ImageConstructorOptions} from 'image-js';

/**
 * Split an image into multiple sub-images.
 *
 * NOTE: `blocksX` and `blocksY` should divide `img.width` and `img.height` evenly.
 *    If not, that's okay, but the last block in a row or col will be smaller.
 *
 * @param img        Image.
 * @param blocksX    Number of blocks in the x-axis.
 * @param blocksY       Number of blocks in the y-axis.
 *
 * @return Image[][] Double array of images.
 */
function toBlocks(img: Image, blocksX: number, blocksY: number): Image[][] {
   
   const blocks: Image[][] = [];
   
   /* Init empty 2d array. */
   for (let y = 0; y < blocksY; y++)
      blocks.push(new Array(blocksX));
   
   /* Fill. */
   for (let x = 0; x < blocksX; x++) {
      for (let y = 0; y < blocksY; y++) {
         const x1 = ~~(x * img.width / blocksX);
         const x2 = ~~((x + 1) * img.width / blocksX);
         const y1 = ~~(y * img.height / blocksY);
         const y2 = ~~((y + 1) * img.height / blocksY);
         blocks[y][x] = img.crop({
            x: x1,
            y: y1,
            width: x2 - x1,
            height: y2 - y1,
         });
      }
   }
   
   return blocks;
}

function simplify(img: Image, charsX: number, charsY: number, threshold: number): boolean[][] {
   const blocks = toBlocks(img.grey().dilate({iterations: 3}), charsX, charsY);
   
   return blocks.map((row: Image[]) =>
      row.map((subImg: Image) =>
         subImg.mean[0] >= img.maxValue * threshold
      )
   );
}

function subChar(simplified: boolean[][], char: string): string[][] {
   return simplified.map((row: boolean[]) =>
      row.map((isEdge: boolean) =>
         isEdge ? char : ' '
      )
   );
}

function toAsciiArray(img: Image, charsX: number, charsY: number, char: string, threshold: number = 0.5): string[][] {
   return subChar(simplify(img, charsX, charsY, threshold), char);
}

function toAsciiString(img: Image, charsX: number, charsY: number, char: string, threshold: number = 0.5): string {
   return toAsciiArray(img, charsX, charsY, char, threshold).map((row: string[]) => row.join('')).join('\n');
}


export const priv = (process.env.NODE_ENV === 'test')
   ? { subChar, simplify, toBlocks }
   : null;

module.exports = { toAsciiArray, toAsciiString, priv };
