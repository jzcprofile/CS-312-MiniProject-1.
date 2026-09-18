const express = require("express");

const app = express();
const PORT = 3000;

// use EJS
app.set("view engine", "ejs");

// Read form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// Temp storage for blog posts
let posts = [];

// Homepage
app.get("/", (req, res) => {
    res.render("index", { posts: posts });
});

// Create a new post
app.post("/posts", (req, res) => {
    const newPost = {
        id: Date.now(),
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        date: new Date().toLocaleString()
    };

    posts.push(newPost);

    res.redirect("/");
});

// Show the edit form for an existing post
app.get("/edit/:id", (req, res) => {
    const post = posts.find((item) => item.id === Number(req.params.id));

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("edit", { post });
});

// Save changes to an existing post
app.post("/edit/:id", (req, res) => {
    const post = posts.find((item) => item.id === Number(req.params.id));

    if (!post) {
        return res.status(404).send("Post not found");
    }

    post.author = req.body.author;
    post.title = req.body.title;
    post.content = req.body.content;

    res.redirect("/");
});

// Delete an existing post
app.post("/delete/:id", (req, res) => {
    const postIndex = posts.findIndex((item) => item.id === Number(req.params.id));

    if (postIndex === -1) {
        return res.status(404).send("Post not found");
    }

    posts.splice(postIndex, 1);
    res.redirect("/");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
