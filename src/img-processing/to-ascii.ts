import {Image} from "image-js";
import {Grid, chop, meanOverThreshold, subChar} from "./chop";
import {canny} from "./canny";

interface options {
   char?: string;
   threshold?: number;
   dilations?: number;
}

export function toAsciiArray(img: Image, charsX: number, charsY: number, options: options = {}): Grid<string> {
   let { char, threshold, dilations } = Object.assign(options, {
      char: "#",
      threshold: 0.5,
      dilations: 2,
   });
   return subChar(
      meanOverThreshold(
         chop(
            canny(img).grey().dilate({ iterations: dilations }),
            charsX,
            charsY),
         threshold),
      char);
}

export function toAsciiString(img: Image, charsX: number, charsY: number, options: options = {}): string {
   return toAsciiArray(img, charsX, charsY, options)
      .map((row: string[]) => row.join(''))
      .join('\n');
}
