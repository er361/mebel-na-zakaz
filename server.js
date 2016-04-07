import express from 'express';
import graphQLHTTP from 'express-graphql';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import Mebel from './data/mebel';
import Category from './data/category';
import { json } from 'body-parser';
import graffiti from '@risingstack/graffiti';
import { getSchema } from '@risingstack/graffiti-mongoose';
import mongoose from 'mongoose';
import config from './webpack.config';
const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;
const SERVER_PORT = 361;

// Expose a GraphQL endpoint
var graphQLServer = express();
//connect to mongoose
mongoose.connect('mongodb://localhost/graphql');
graphQLServer.use(json());

graphQLServer.use(graffiti.express({
  schema: getSchema([Mebel,Category])
}));

graphQLServer.use((req, res) => {
  res.redirect('/graphql');
});

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));


var app = new WebpackDevServer(config, {
  contentBase: '/public/',
  proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
  publicPath: '/js/',
  stats: {colors: true}
});
// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'public')));

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});

//multer
var storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,'./public/images')
  },filename: (req,file,cb) => {
    cb(null,file.originalname)
  }
});

app.use('/upload', multer({storage:storage}).any('image'),(req,res)=>{
  //  console.log(req.url);
  //  console.log(req.headers);
  //  console.log(req.body);
  //  console.log(req.files);
   res.json(req.body);
});
