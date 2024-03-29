const express = require("express");
const app = express();
const port = 8080;

const path = require("path");
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("veiws", path.join(__dirname, "/views"));

app.use(express.static (path.join(__dirname, "public")));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'



let posts = [
    {
        id: uuidv4(),
        username: "Abhi",
        content: "i love coding"
    },
    {
        id: uuidv4(),
        username: "poojary",
        content: "achieve success"
    },
    {
        id: uuidv4(),
        username: "jeeth",
        content: "i love readng"
    },
];

app.get("/posts", (req, res) =>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/posts", (req, res)=>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res)=>{
   let {id} = req.params;
   console.log(id);
   let post = posts.find((p) => id === p.id);
   console.log(post);
   res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req, res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs");
});

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});



app.listen(port, () => {
    console.log("listening to port : 8080");
});

