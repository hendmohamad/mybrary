if(process.env.NODE_ENV !== 'production'){

    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const authorRourter = require('./routes/author');
const bookRourter = require('./routes/book');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));
app.use(methodOverride('_method'));

const mongoose = require('mongoose');
//console.log('URL:' +process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser :true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.on('open', () => console.log('CONNECTED TO MANGOOSE'))

app.use('/', indexRouter);
app.use('/authors', authorRourter);
app.use('/books', bookRourter);
app.listen(process.env.PORT || 8000);