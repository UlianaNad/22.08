const express = require ('express');
const path = require('path');

const server = express();

const session = require('express-session');

const multer = require('multer');

const mainRouter = require('./routes/main');
const videoRouter = require('./routes/video');
const { appendFile } = require('fs');

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

server.use('/public', express.static(path.join(__dirname, 'public')));


let pageVisits = {};
let visits = function(req, res, next) {
    let counter = pageVisits[req.originalUrl];
    if(counter || counter === 0) {
        pageVisits[req.originalUrl] = counter + 1;
    } else {
        pageVisits[req.originalUrl] = 1;
    }
    console.log(req.originalUrl, pageVisits[req.originalUrl]);
    next();
    res.end;
};
server.use(visits);


server.use(express.json({extended:true }));
server.use('/images', express.static(path.join(__dirname, 'images')));


// multer

const fileMiddleware = require('./routes/multer');

server.post("/single", fileMiddleware.single('image'), (req, res) => {
    console.log(req.file);
   res.send("Single file upload succes");
});



// routes

server.use('/', mainRouter);

server.use('/video', videoRouter);


// errors 


// server.use((req, res, next) => {
//     res.statusCode = 404;
//     res.render('404');
// });



server.use ((err, req, res, next) => {

    console.log('error.status:'+ error.status);
    console.log('error.statusCode:'+ error.statusCode);
    console.log('error.massage:'+ error.massage);

    if(error.status === 404){
        console.log('error.status:'+ error.status);
        res.statusCode = 404;
        res.render('404');
      
    }
    if(error.status === 502){
        console.log('error.status:'+ error.status);
        res.statusCode = 502;
        res.render('502');
       
    }
});




// server.use((error, req, res, next) => { 
//     res.status(400);
//     res.json('somthing is wrong');
// })

server.listen(3000);