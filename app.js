//importing all the modules
const express = require('express');
const app = express();
const storeRouter = require('./routes/storeRouter');
const error = require('./routes/error');
const path = require('path');
const {hostRouter} = require('./routes/hostRouter');
const { default: mongoose } = require('mongoose');
const authRouter = require('./routes/authRouter');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGO_DB_URL = "mongodb+srv://aritraghosh2005_db_user:fs4AYxYoqc1sEdEH@aritradata.rto8otg.mongodb.net/AritraData?appName=AritraData";
const store = new MongoDBStore({
    uri : MONGO_DB_URL,
    collection : 'sessions',
    
})
const multer = require('multer');
const rootDir = require('./utils/rootDir');
const randomString = (length) => {
    const characters = 'qwertyuioplkjhgfdsazxcvbnm';
    let result = '';
    for(let i =0;i < length;i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,'uploads/');
    },

    filename: (req,file,cb) => {
        cb(null,randomString(10)+'-'+file.originalname);
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null,true);
    }
    else {
        cb(null,false);
    }
}

const multerOptions = {
    storage,fileFilter
};

//This line enables EJS as the template engine for rendering views.
app.set('view engine', 'ejs');
//This line tells the express where the view files are located
app.set('views', 'views');


app.use(session ({
    secret : "Aritra",
    resave : false,
    saveUninitialized : true,
    store : store,
}))
app.use((req,res,next) => {
   req.isLoggedIn = req.session.isLoggedIn;
   next();
});

//exposing the public folder so that browser can load styles and images
app.use(express.static(path.join(__dirname, 'public')));
//Parsing
app.use(express.urlencoded({ extended: true }));
app.use(multer(multerOptions).single('image'));
app.use('/uploads',express.static(path.join(rootDir,'uploads')));
app.use('/host/uploads',express.static(path.join(rootDir,'uploads')));
app.use('/home/uploads',express.static(path.join(rootDir,'uploads')));


//routers
app.use(storeRouter);
app.use(hostRouter);
app.use(authRouter);
app.use(error);


const PORT = 3002;

mongoose.connect(MONGO_DB_URL).then(()=> {
    app.listen(PORT,()=> {
    console.log(`Server is Running on  http://localhost:${PORT}`);
})
}).catch((err)=> {
    console.log("Error while connecting to mongoose",err);
});