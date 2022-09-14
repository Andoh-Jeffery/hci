const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
dotenv.config();
const path = require('path');
const Post = require('./modals/post');
const port = process.env.PORT;
const app = express();
const bodyParser = require('body-parser');
const post = require('./modals/post');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'assets')));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(bodyParser.urlencoded({extended: false}));

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

//GET ALL BLOGS 
app.get('/', (req, res) => {
  Post.find({}, (err, data) => {
    if (!err) {
      res.render('index', { postdata: data ,title:'homepage'})
    }

  })

})

// GET SINGLE BLOG
app.get('/details/:id',(req,res)=>{
 
  const id=req.params.id;
  Post.findById(id,(err,data)=>{
    if(!err){
      res.render('details',{detail:data,title:'details'})
  }console.log('no data');
  })
 
});


app.get('/post', (req, res) => {
  res.render('post',({title:"post"}));
})
// 
app.get('/author', (req, res) => {
  res.render('author',({title:"author"}))
})
//  
app.get('/post/addnew', (req, res) => {
  res.render('addNew',({title:"add_blog"}));
})

// POST

app.post('/post/addnew', async (req, res) => {
  // res.send("AddNew Success");
  // res.end();
  const { title, body } = req.body;
 
  const postObj = new Post({
    title,
    body
  });
  
  await postObj.save((err,data)=>{
    if(err){
      console.log(err);
    }
  });
  res.redirect('/');
  res.end;
  

})
