import { Image } from 'image-js';
import cannyEdgeDetector from "canny-edge-detector";


export async function cannyFromFile(filename: string): Promise<Image> {
   const img = await Image.load(filename);
   
   const grey = img.grey();
   return cannyEdgeDetector(grey);
}

export async function cannyFromCanvas(canvas: HTMLCanvasElement): Promise<Image> {
   const img = await Image.fromCanvas(canvas);
   
   const grey = img.grey();
   return cannyEdgeDetector(grey);
}

export function cannyFromImage(img: Image) {
   return cannyEdgeDetector(img.grey());
}
