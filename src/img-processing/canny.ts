import { Image } from 'image-js';
import cannyEdgeDetector from "canny-edge-detector";

export function canny(img: Image) {
   return cannyEdgeDetector(img);
}
