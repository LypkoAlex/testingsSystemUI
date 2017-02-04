import express from 'express';
import path    from 'path';
import { appPort } from './etc/config.json'
const app    = express();
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/*', express.static(path.join(__dirname, 'public')));

app.listen(appPort);
