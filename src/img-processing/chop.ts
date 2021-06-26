import { Image } from 'image-js';

/**
 * 2D array of smaller parts of something, e.g. an image chopped up.
 */
export type Grid<T> = T[][];

/**
 * Split an image into a grid of sub-images.
 *
 * NOTE: `gridX` and `gridY` should divide `img.width` and `img.height` evenly.
 *    If not, that's okay, but the last block in a row or col will be smaller.
 *
 * @param img        Image.
 * @param gridX    Number of blocks in the x-axis.
 * @param gridY    Number of blocks in the y-axis.
 *
 * @return Image[][] Double array of images.
 */
export function chop(img: Image, gridX: number, gridY: number): Grid<Image> {
   
   const grid: Grid<Image> = [];
   
   /* Init empty 2d array. */
   for (let y = 0; y < gridY; y++)
      grid.push(new Array(gridX));
   
   /* Fill. */
   for (let x = 0; x < gridX; x++) {
      
      const x1 = ~~(x * img.width / gridX);
      const x2 = ~~((x + 1) * img.width / gridX);
      
      for (let y = 0; y < gridY; y++) {
         
         const y1 = ~~(y * img.height / gridY);
         const y2 = ~~((y + 1) * img.height / gridY);
         
         grid[y][x] = img.crop({
            x: x1,
            y: y1,
            width: x2 - x1,
            height: y2 - y1,
         });
      }
   }
   
   return grid;
}

/**
 * If the mean (first channel ONLY) of a grid's cell is over a threshold, replace with true, else false.
 */
export function meanOverThreshold(grid: Grid<Image>, threshold: number): Grid<boolean> {
   return grid.map((row: Image[]) =>
      row.map((subImg: Image) =>
         subImg.mean[0] >= grid[0][0].maxValue * threshold
      )
   );
}

/**
 * Replace a boolean grid with a char grid. False values are replaced
 * with whitespace, e.g., ' '.
 * @param grid          Boolean grid, e.g., after the mean threshold function.
 * @param char          Char to replace truthy values.
 */
export function subChar(grid: Grid<boolean>, char: string): Grid<string> {
   return grid.map((row: boolean[]) =>
      row.map((isEdge: boolean) =>
         isEdge ? char : ' '
      )
   );
}
