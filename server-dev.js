import express from 'express';
import multer from 'multer';
import {json} from 'body-parser';
import fs from 'fs'

var app = express();
//app.use(json());
app.post('/upload',multer({dest:'./uploads'}).any('image'),(req,res)=>{
  //req.pipe(fs.createWriteStream(__dirname + req.url,'binary'));
  console.log(req.headers);
  console.log(req.body);
  console.log(req.url);
  console.log(req.files);
  res.json(req.body);
})
app.listen(3000);
