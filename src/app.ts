import express from 'express';
import { default as cors } from 'cors';
require('dotenv').config();

const { port } = process.env;
const app = express();

/* Middleware. */
app.set('port', port);
app.set('views', '/views');
app.set('view engine', 'ejs');
app.use(cors());

/* Routing. */

app.listen(port, () => {
   console.log(`Web server listening on port ${port}.`);
});
