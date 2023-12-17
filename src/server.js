import express from 'express';
import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';
import "./db/mongo.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
 

import { subcategory_router } from './routes/subcategory.routes.js';
import { category_router } from './routes/category.routes.js';
import { discount_router } from './routes/discount.routes.js';
import { position_router } from './routes/position.routes.js';
import { comment_router } from './routes/comment.routes.js';
import { product_router } from './routes/product.routes.js';
import { brand_router } from './routes/brand.routes.js';
import { user_router } from './routes/user.routes.js';
import { auth_router } from './routes/auth.routes.js';
import { upload_router } from './routes/upload.routes.js';
import { order_router } from './routes/order.routes.js';



app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.set('.html', path.join(process.cwd(), "views"));

app.get('/', (req, res) => { res.render('index') })
app.get('/index', (req, res) => { res.render('index') })
app.get('/index.html', (req, res) => { res.render('index') })

app.get('/liked', (req, res) => { res.render('liked') })
app.get('/cart', (req, res) => { res.render('cart') })
// app.get('/categories', (req, res) => { res.render('categories') })
app.get('/search', (req, res) => { res.render('search') })
app.get('/category', (req, res) => { res.render('category') })
app.get('/product', (req, res) => { res.render('product') })
app.get('/user', (req, res) => { res.render('user') })
app.get('/register', (req, res) => { res.render('register') })
app.get('/login', (req, res) => { res.render('login') })
app.get('/forgotpassword', (req, res) => { res.render('forgotpassword') })
app.get('/newpassword', (req, res) => { res.render('newpassword') })
app.get("/users/check/:pass", (req, res) => { res.render('newpassword') })
app.get('/dashboard', (req, res) => { res.render('dashboard') })
app.get('/order', (req, res) => { res.render('order') })
app.get('/adminorder', (req, res) => { res.render('adminorder') })
app.get('/addadmin', (req, res) => { res.render('addadmin') })
app.get('/productsingle', (req, res) => { res.render('productsingle') })


app.get('/liked.html', (req, res) => { res.render('liked') })
app.get('/cart.html', (req, res) => { res.render('cart') })
app.get('/categories.html', (req, res) => { res.render('categories') })
app.get('/search.html', (req, res) => { res.render('search') })
app.get('/category.html', (req, res) => { res.render('category') })
app.get('/product.html', (req, res) => { res.render('product') })
app.get('/user.html', (req, res) => { res.render('user') })
app.get('/register.html', (req, res) => { res.render('register') })
app.get('/login.html.html', (req, res) => { res.render('login') })
app.get('/forgotpassword.html', (req, res) => { res.render('forgotpassword') })
app.get('/newpassword.html', (req, res) => { res.render('newpassword') })
app.get("/users/check/:pass", (req, res) => { res.render('newpassword') })
app.get('/dashboard.html', (req, res) => { res.render('dashboard') })
app.get('/order.html', (req, res) => { res.render('order') })
app.get('/adminorder.html', (req, res) => { res.render('adminorder') })
app.get('/addadmin.html', (req, res) => { res.render('addadmin') })
app.get('/productsingle.html', (req, res) => { res.render('productsingle') })



app.use(express.static('public'));

app.use('/uploads', express.static('uploads'));

app.use("/categories", category_router)
app.use("/subcategories", subcategory_router)
app.use("/discounts", discount_router)
app.use("/positions", position_router)
app.use("/comments", comment_router)
app.use("/products", product_router)
app.use("/brands", brand_router)
app.use("/users", user_router)
app.use("/orders", order_router)
app.use("/auth", auth_router)
app.use("/upload", upload_router)



app.listen(PORT);
console.log("App listening on: http://localhost:" + PORT);