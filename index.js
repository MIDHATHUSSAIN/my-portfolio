const express = require("express");
const app = express();
const port = process.env.PORT || 4000
const path = require("path")
const mongoose = require("mongoose");
const { error } = require("console");
const multer = require('multer')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.set('view engine','hbs')

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"/home.html")) 
})
app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,"/signup.html")) 
})
app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,"/login.html")) 
})
const userSchema = new mongoose.Schema({
    name:{
        type : String, 
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type: String,
        required : true
    },
})

const myuser = mongoose.model("myuser", userSchema);
mongoose.connect('mongodb://127.0.0.1:27017/mydata')
.then(()=>{
    console.log("connection established")
}).catch(error=>{
    console.error("there is something wrong",error)
})
app.use(express.static(__dirname));

app.post('/signup',async(req,res)=>{
     const idata ={
        name:req.body.name,
        password:req.body.password,
        email:req.body.email
     }
   await myuser.insertMany([idata]) 
   res.sendFile(path.join(__dirname,"/home.html")) 
})
app.post('/login',async(req,res)=>{
   try{
      const check =await myuser.findOne({name : req.body.name , email:req.body.email , password:req.body.password})
      if(check.password===req.body.password && check.email===req.body.email){
        res.sendFile(path.join(__dirname,"/home.html")) 
      }else{
        res.send("your password or email is wrong")
      }
   }
   catch{
      res.sendFile(path.join(__dirname,"/signup.html"))   
      
   }
    
})

const myschema = new mongoose.Schema({
    pname:{
        type : String, 
        required : true
    },
    pimage:{
        type : String,
        required : true
    },
    pprice:{
        type: String,
        required : true
    },
})
const pdata = mongoose.model("pdata",myschema );
app.post('/shope1', async (req, res) => {
    try {
        const { pname, pprice, pimage } = req.body;

        const newProduct = new pdata({ pname, pprice, pimage });
        await newProduct.save();

        res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});
app.post('/shope2', async (req, res) => {
    try {
        const { pname, pprice, pimage } = req.body;

        const newProduct = new pdata({ pname, pprice, pimage });
        await newProduct.save();

        res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});
app.post('/shope3', async (req, res) => {
    try {
        const { pname, pprice, pimage } = req.body;

        const newProduct = new pdata({ pname, pprice, pimage });
        await newProduct.save();

        res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});
app.post('/shope4', async (req, res) => {
    try {
        const { pname, pprice, pimage } = req.body;

        const newProduct = new pdata({ pname, pprice, pimage });
        await newProduct.save();

        res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});
app.post('/shope5', async (req, res) => {
    try {
        const { pname, pprice, pimage } = req.body;

        const newProduct = new pdata({ pname, pprice, pimage });
        await newProduct.save();

        res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});
app.post('/shope6', async (req, res) => {
    try {
        const { pname, pprice, pimage } = req.body;

        const newProduct = new pdata({ pname, pprice, pimage });
        await newProduct.save();

        res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});
app.get('/cart', async (req, res) => {
    try {
        
        const products = await pdata.find({});

        
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});
app.delete('/cart/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        
        await pdata.findByIdAndDelete(productId);

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});
  

app.listen(port)