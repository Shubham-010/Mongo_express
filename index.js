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

app.get('/test',(req,res)=>{
    res.send('Lets Go!');
})
const categories = ['fruit','vegetables','dairy']
// --------------
app.get('/products',async (req,res)=>{
   const products = await Product.find({})
    console.log(products,'products');
    res.render('products/index',{products});
})
// ------------
app.get('/products/new',async(req,res)=>{
    res.render('products/new', { categories })
})
// -----------
app.get('/products/:id/edit',async(req,res)=>{
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
})
// ------------
app.put('/products/:id',async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,req.body,{runValidators:true}) //edit the product
    console.log(product);
    res.redirect(`/products/${product._id}`)
})
// ------------
app.post('/products',async(req,res)=>{
    console.log(req.body,"REQ");
    const newProduct =  new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)

    console.log(newProduct,"newProduct");
    // res.send('making your products')
})
// -----------------
app.get('/products/:id',async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    console.log(product,'product ID');
    // res.send('details page')
    res.render('products/show',{product})
})
// ----------------
app.listen(7777,()=>{
    console.log('App is listening on port - 7777 :>> ', );
})

