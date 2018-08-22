require('dotenv').config();
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const clichRoutes = require('./routes/clichRoutes');

     // assign mongoose promise library and connect to database
mongoose.Promise = global.Promise;
const URL = process.env.MONGODB_URI_PROD || process.env.MONGODB_URI_DEV;
//const URL = process.env.MONGODB_URI_DEV;
mongoose.connect(URL, { useNewUrlParser: true })
  .then(() => console.log(`Database connected`))
  .catch(err => console.log(`Database connection error: ${err.message}`));

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use('/cliches', clichRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen( process.env.PORT, () => {
    console.log('Server started on port', process.env.PORT, '. . .');
});

module.exports = app;