const mongoose = require('mongoose');
const Product = require('./models/products');
mongoose.connect('mongodb://localhost:27017/dbtest')
    .then(() => { console.log('connection established :>> ',); })
    .catch(() => { console.log('error in conneection :>> ',); })


const seedProducts = [
    {
        name: 'Orange',
        price: 40,
        category: 'fruit'  
    },
    {
        name: 'Apple',
        price: 60,
        category: 'fruit'
    },
    {
        name: 'Watermelon',
        price: 70,
        category: 'fruit'
    },
    {
        name: 'Carrot',
        price: 50,
        category: 'vegetables'
    },
    {
        name: 'milk',
        price: 10,
        category: 'dairy'
    }
]

Product.insertMany(seedProducts).then(p => {
    console.log('p :>> ', p);
}).catch((e) => { console.log(e, 'error'); });



// const p = new Product({
//     name:'Grapes',
//     price:50,
//     category:'fruit'
// })
// p.save().then(p =>{
//     console.log('p :>> ', p);
// }).catch((e)=>{console.log(e,'error');})