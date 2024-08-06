import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
const blog_dictionary = {};

app.get("/",(req,res)=>{
    // console.log(req.body);
    let len = Object.keys(blog_dictionary).length;
    res.render("index.ejs",{
        length : len,
        blog : blog_dictionary,
    });
});

app.post("/add",(req,res)=>{
    // console.log(req.body);
    blog_dictionary[req.body["title"]]=req.body["blog"];
    let len = Object.keys(blog_dictionary).length;
    res.render("index.ejs",{
        length : len,
        blog : blog_dictionary,
    });
});

app.post("/delete",(req,res)=>{
    console.log(req.body);
    const blog_title = req.body["item"];
    delete blog_dictionary[blog_title];
    let len = Object.keys(blog_dictionary).length;
    res.render("index.ejs",{
        length : len,
        blog : blog_dictionary,
    });
});

app.get("/create",(req,res)=>{
    res.render("create.ejs");
});

app.post("/view",(req,res)=>{
    const blog_title = req.body["item"];
    const matter = blog_dictionary[blog_title];
    res.render("view.ejs",{
        title : blog_title,
        content : matter,
    });
});

app.post("/edit",(req,res)=>{
    const blog_title = req.body["item"];
    const matter = blog_dictionary[blog_title];
    res.render("edit.ejs",{
        title : blog_title,
        content : matter,
    });
});

app.listen(port,()=>{
    console.log(`listening in port ${port}`);
});

