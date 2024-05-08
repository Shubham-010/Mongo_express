const express =  require('express');
const app = express();
const path =  require('path');
const mongoose = require('mongoose');
const Product = require('./models/products');
mongoose.connect('mongodb://localhost:50667/testdb')
.then(()=>{console.log('connection established :>> ', );})
.catch(()=>{console.log('error in conneection :>> ', );})

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');
app.get('/test',(req,res)=>{
    res.send('Lets Go!');
})
// --------------
app.get('/products',async (req,res)=>{
   const products = await Product.find({})
    console.log(products,'products');
    res.render('products/index',{products});
})

app.get('/products/new',async(req,res)=>{
    res.render('products/new',{})
})

app.post('/products',(req,res)=>{
    console.log(req.body,"REQ");
    res.send('making your products')
})

app.get('/products/:id',async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    console.log(product,'product ID');
    // res.send('details page')
    res.render('products/show',{product})
})
app.listen(7777,()=>{
    console.log('App is listening on port - 7777 :>> ', );
})

