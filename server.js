const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose')
dotenv.config();
const path=require('path');
const Post=require('./modals/post');
const port=process.env.PORT;
const app=express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(
      process.env.PORT,
      console.log(`server is running on port: ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err.message));

app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/post',(req,res)=>{
    res.render('post');
})
app.get('/author',(req,res)=>{
    res.render('author')
})
app.get('/post/addNew',(req,res)=>{
    res.render('addNew');
})
// POST

app.post('/post/addNew',async(req,res)=>{
   const {title,body}=req.body;
   const postObj=new Post({
    title,
    body
   });
   
   await postObj.save()
   
   
   res.send('data saved');
   res.end;
    
})


// app.listen(port,console.log(`app listening on port : ${port}`));