import * as express from 'express';
import { Image } from 'image-js';
import * as ascii from '../img-processing/to-ascii';

export const index_get: express.RequestHandler = async function(req, res) {
   res.render('pages/index.ejs', {
      title: 'Convert images to ASCII art'
   });
}

export const index_post: express.RequestHandler = async function(req, res) {
   console.log('POST: Image processing request.');
   
   //const bodyStr = Buffer.from(req.body.data, 'base64').toString('ascii');
   const img = new Image(req.body.img.width, req.body.img.height, req.body.img.data, req.body.img.options);
   if (img === null || img === undefined)
      return; // TODO: Proper error handling.
   
   const { width, height, ...options } = Object.assign({
      width: ~~(img.width / 6),
      height: ~~(img.height / 16),
   }, req.body.options);
   
   const result = ascii.toAsciiArray(img, width, height, options);
   res.json(JSON.stringify(result));
}
