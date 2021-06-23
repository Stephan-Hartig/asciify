import each from "jest-each";
import { cannyFromFile } from "../../src/edge-detection/canny";



describe('cannyFromFile()', () => {
   each([
      ["assets/rf_bird512x512.png", 512, 512],
      ["assets/rf_tux512x512.png", 512, 512],
      ["assets/rf_flower400x300.jpg", 400, 300],
   ]).test('image %s is %s x %s pixels', async (file, width, height) => {
      const canny = await cannyFromFile(file);
      expect([canny.width, canny.height]).toEqual([width, height]);
   });
});
