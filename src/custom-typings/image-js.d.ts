export {};

declare module 'image-js' {
   export interface Image {
      median(): number[];
      mean(): number[];
   }
}