import {Image} from "image-js";
import {Grid, chop, meanOverThreshold, subChar} from "./chop";
import {canny} from "./canny";

interface ToAsciiArrayOptions {
   char?: string;
   whitespace?: string;
   threshold?: number;
   dilations?: number;
}

export function toAsciiArray(img: Image, charsX: number, charsY: number, options: ToAsciiArrayOptions = {}): Grid<string> {
   let { char, whitespace, threshold, dilations } = Object.assign({
      char: '#',
      whitespace: ' ',
      threshold: 0.5,
      dilations: 2,
   }, options);
   return subChar(
      meanOverThreshold(
         chop(
            canny(img.grey()).dilate({ iterations: dilations }),
            charsX,
            charsY),
         threshold),
      char,
      whitespace);
}

export function toAsciiString(img: Image, charsX: number, charsY: number, options: ToAsciiArrayOptions = {}): string {
   return toAsciiArray(img, charsX, charsY, options)
      .map((row: string[]) => row.join(''))
      .join('\n');
}
