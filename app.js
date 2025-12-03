
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import session from 'express-session';
import expressLayouts from 'express-ejs-layouts';
import { fileURLToPath } from 'url';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Choose env file based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// Initialize app
const app = express();

// Routes
import categoryRoutes from './routes/categoryRoutes.js';
import itemRoutes from './routes/itemsRoutes.js';

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);

// Session setup
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
app.use('/items', itemRoutes);

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