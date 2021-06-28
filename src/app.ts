import express from 'express';
import { default as cors } from 'cors';
require('dotenv').config();

import { index_get, index_post } from "./routing";

/* Set up. */
const { port } = process.env;
const app = express();

/* Middleware. */
app.set('port', port);
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({limit: '100mb', extended: true}));
app.use(express.text({ limit: '100mb' }));

app.use('/static', express.static('public'));
app.use('/static/css', express.static('public/css'));
app.use('/static/js', express.static('public/js'));
app.use('/static/assets', express.static('public/assets'));
app.use('/favicon.ico', express.static('public/assets/favicon.ico'));

/* Routing. */
app.get('/', index_get);
app.post('/', index_post);

app.listen(port, () => {
   console.log(`Web server listening on port ${port}.`);
});
