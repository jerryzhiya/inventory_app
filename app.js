
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const envFile = process.env.NODE_ENV = 'production'? ".env.production" : '.env.development';


dotenv.config({path: path.resolve(process.cwd(),envFile)});

const pool = require('./db/pool');

pool.query('SELECT NOW()', (err, res)=> {
  if(err) {
    console.log('Database connection error');
  } else {
    console.log('connected at:', res.rows[0]);
  }
});
// Routes
const categoryRoutes = require('./routes/categoryRoutes');
const itemRoutes = require('./routes/itemsRoutes');

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);

// Session setup (must come BEFORE routes and locals middleware)
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback secret', 
  resave: false,
  saveUninitialized: false
}));

// Expose session to views
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Mount routes
app.use('/categories', categoryRoutes);
app.use('/categories', itemRoutes);

// Home page
app.get('/', (req, res) => {
  res.render('index', { title: 'Shoe Store Inventory' });
});

// Admin login/logout
app.get('/admin/login', (req, res) => {
  res.render('admin/login', { title: 'Login' });
});

app.post('/admin/login', (req, res) => {
  const { adminCode } = req.body;
  if (adminCode === process.env.ADMIN_CODE) {
    req.session.isAdmin = true;
    return res.redirect('/');
  }
  res.status(403).send('Invalid Code');
});

app.get('/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express app running at http://localhost:${PORT}`);
});