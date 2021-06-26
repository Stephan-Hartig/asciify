import each from "jest-each";
import { canny } from "../../src/img-processing/canny";
import { Image } from 'image-js';



describe('canny()', () => {
   each([
      ["assets/rf_bird512x512.png", 512, 512],
      ["assets/rf_tux512x512.png", 512, 512],
      ["assets/rf_flower400x300.jpg", 400, 300],
   ]).test('image %s is %s x %s pixels', async (file, width, height) => {
      const img = canny((await Image.load(file)).grey());
      expect([img.width, img.height]).toEqual([width, height]);
   });
});
