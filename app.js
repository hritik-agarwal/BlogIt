// importing libraries
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const _ = require("lodash");

// setting up our app
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// setting up database
mongoose.connect("mongodb+srv://admin-hritik:blog456@blog.ffwyh.mongodb.net/blogDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).catch("Not Connected");

// blog Schema
const blogSchema = {
  title: String,
  content: String
}
// blog collection (mongoose model)
const Blog = mongoose.model("Blog", blogSchema);

// setting up our port
const port = process.env.PORT || 8080;

// get request on hompage
app.get("/", (req, res) => {
  Blog.find({},(err, blogs)=>{
    if(err) console.log("Error in get request to /");
    else {
      if(blogs.length === 0){
        res.render("index",{blogs: {title: "", content: ""}});
      }
      else res.render("index",{blogs: blogs});
    }
  });
});

// new blog get request
app.get("/newBlog", (req, res) => {
  res.render("newBlog");
});

// read more request
app.get("/blogs/:id",(req,res)=>{
  Blog.findOne({_id: req.params.id},(err,blog)=>{
    if(err) console.log("Error in blog/id");
    else res.render("showblog",{blog: blog});
  });
});

// new blog post request
app.post("/newBlog", (req, res) => {
  const blog = new Blog({
    title : req.body.title,
    content : req.body.content
  });
  blog.save();
  res.redirect("/");
});

// delete blog
app.post("/deleteBlog", (req,res)=>{
  const id = req.body.blogId;
  Blog.findByIdAndDelete(id,()=>{res.redirect("/");});
});

app.post("/editBlog", (req,res)=>{
  const id = req.body.blogId;
  Blog.findById(id, (err, blog)=>{
    if(err) console.log("Error in edit blog");
    else res.render("editBlog",{blog: blog});
  });
});

app.post("/updateBlog", (req,res)=>{
  const id = req.body.blogId;
  console.log(req.body);
  console.log(id);
  Blog.updateOne({_id: id}, {$set: {
    title: req.body.title,
    content: req.body.content
  }}, ()=>{res.redirect("/");});
});

// contact page
app.get("/contact",(req,res)=>res.render("contact"));

// listening on port
app.listen(port, () => console.log("Server started at port " + port));

