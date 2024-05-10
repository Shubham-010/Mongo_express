const express =  require('express');
const app = express();
const path =  require('path');
const mongoose = require('mongoose');
const Product = require('./models/products');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/dbtest')

.then(()=>{console.log('connection established :>> ', );})
.catch(()=>{console.log('error in conneection :>> ', );})

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');
app.use(methodOverride('_method'))

//when there is post request we dont have access to body directly
app.use(express.urlencoded({extended:true})); //to connect middleware express to the body in html


const categories = ['fruit','vegetables','dairy']
// ------Display all products--------
app.get('/products',async (req,res)=>{
    const {category} = req.query;
    if(category){
        const products = await Product.find({category})
        res.render('products/index',{products,category});
    }else{
        const products = await Product.find({})
        console.log(products,'products');
        res.render('products/index',{products,category:"All"});
    }
})
// -------Access the New product form-----
app.get('/products/new',async(req,res)=>{
    res.render('products/new', { categories })
})
// -------find and edit ----
app.get('/products/:id/edit',async(req,res)=>{
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
})
// -------Update a product--------
app.put('/products/:id',async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,req.body,{runValidators:true}) //edit the product
    console.log(product);
    res.redirect(`/products/${product._id}`)
})
// ----------Add data in database--------------------
app.post('/products',async(req,res)=>{
    console.log(req.body,"REQ");
    const newProduct =  new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)

    console.log(newProduct,"newProduct");
})
// -------Access Product Details----------
app.get('/products/:id',async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    console.log(product,'product ID');
    // res.send('details page')
    res.render('products/show',{product})
})
// --------Delete Product--------
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deleteproduct = await Product.findByIdAndDelete(id);
    // res.send('details page')
    res.redirect('/products')
})
// ----------------
app.listen(7777,()=>{
    console.log('App is listening on port - 7777 :>> ', );
})

