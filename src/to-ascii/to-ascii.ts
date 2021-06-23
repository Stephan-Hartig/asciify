import { Image } from 'image-js';

/**
 * Split an image into multiple sub-images.
 *
 * NOTE: `columns` and `rows` should divide `img.width` and `img.height` evenly.
 *    If not, that's okay, but the last block in a row or col will be smaller.
 *
 * @param img        Image.
 * @param columns    Number of blocks in the x-axis.
 * @param rows       Number of blocks in the y-axis.
 *
 * @return Image[][] Double array of images.
 */
function toBlocks(img: Image, columns: number, rows: number): Array<Array<Image>> {
   
   img.checkProcessable('points', {
      bitDepth: [1],
   });
   
   interface RawImage {
      width: number;
      height: number;
      data: number[];
   }
   
   const blocks: RawImage[][] = [];
   
   for (let c = 0; c < columns; c++) {
      blocks.push(new Array(rows));
      for (let r = 0; r < rows; r++) {
         blocks[c][r] = { width: 0, height: 0, data: new Array() };
      }
   }
   
   /* Put raw pixel data in the appropriate block. */
   for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
         const blockX = ~~(x / columns);
         const blockY = ~~(y / rows);
         
         blocks[blockX][blockY].data.push.apply(img.getPixelXY(x, y));
         blocks[blockX][blockY].width++;
         blocks[blockX][blockY].height++;
      }
   }
   
   /* Convert `RawImage -> Image`. */
   return blocks.map((row: RawImage[]) =>
      row.map((subImg: RawImage) =>
         new Image(subImg.width, subImg.height, subImg.data)
      )
   );
}

function simplify(img: Image, charsX: number, charsY: number, threshold: number = 0.5): boolean[][] {
   const blocks = toBlocks(img.grey().dilate({iterations: 3}), charsX, charsY);
   
   const mean = blocks.map((row: Image[]) =>
      row.map((subImg: Image) =>
         subImg.mean()
      )
   );
   
   return mean.map((row: number[][]) =>
      row.map((mean: number[]) =>
         mean[0] > threshold ? true : false
      )
   );
}

function subChar(simplified: boolean[][], char: string): string {
   return simplified.map((row: boolean[]) =>
      row.map((isEdge: boolean) =>
         isEdge ? char : " "
      ).join("")
   ).join("\n");
}


export const priv = (process.env.NODE_ENV === 'test')
   ? { subChar, simplify, toBlocks }
   : null;