declare module 'canny-edge-detector' {
   
   import { Image } from 'image-js';
   
   interface options {
      lowThreshold?: number;
      highThreshold?: number;
      gaussianBlur?: number;
   }
   
   export default function cannyEdgeDetector(image: Image, options?: options): Image;
}