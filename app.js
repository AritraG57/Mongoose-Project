//importing all the modules
const express = require('express');
const app = express();
const storeRouter = require('./routes/storeRouter');
const error = require('./routes/error');
const path = require('path');
const {hostRouter} = require('./routes/hostRouter');
const { default: mongoose } = require('mongoose');

//This line enables EJS as the template engine for rendering views.
app.set('view engine', 'ejs');
//This line tells the express where the view files are located
app.set('views', 'views');

//exposing the public folder so that browser can load styles and images
app.use(express.static(path.join(__dirname, 'public')));

//just printing something something in the console
// app.use((req,res,next)=> {
//     console.log(req.url,req.method);
//     next();
// });

//Parsing
app.use(express.urlencoded({ extended: true }));

//routers
app.use(storeRouter);
app.use(hostRouter);
app.use(error);


const PORT = 3002;

mongoose.connect("mongodb+srv://aritraghosh2005_db_user:fs4AYxYoqc1sEdEH@aritradata.rto8otg.mongodb.net/AritraData?appName=AritraData").then(()=> {
    app.listen(PORT,()=> {
    console.log(`Server is Running on  http://localhost:${PORT}`);
})
}).catch((err)=> {
    console.log("Error while connecting to mongoose",err);
});