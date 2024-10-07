// console.log("hellow backend")
const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const { connectDb } = require("./connection");
const { BlogPost } = require("./models/BlogPost");

// middleware
app.use(express.json());
app.use(cors());

// connect database
connectDb();

// Route1 for post-blog
app.post('/post-blog', async (req, res) => {
    let blog = new BlogPost({
        title: req.body.title,
        description: req.body.description,
    });

    await blog.save();
    res.json({ message: "Blog post sucessfully", blog });
})

// Route2 for get the data from the database
app.get("/get-blog", async (req, res) => {
    let blogs = await BlogPost.find();
    if (!blogs) {
        res.status(404).json({ message: "No blog found" })
    }
    else {
        res.json({ blogs })
    }

})

// Route3 for delete the data from the database
// for delete req access as the /:ID

app.delete("/delete-blog/:id", async (req, res) => {
    let blog = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blog) {
        res.status(404).json({ message: "No blog found" })
    }
    res.status(400).json({ message: "Blog deleted successfully" })

})

// Route-4 for Update the blog(its identify the delete id)
app.put("/update-blog/:id", async (req, res) => {
    let blog = await BlogPost.findByIdAndUpdate(req.params.id);
    if (!blog) {
        res.status(404).json({ message: "No blog found" })
    }
    // blog.title = req.body.title;
    // blog.description = req.body.description;
    // vallidation
    if (!req.body.title && !req.body.description) {
        res.json({ message: "Please provide title and description" })
    } else if (!req.body.title) {
        blog.description = req.body.description;
    } else if (!req.body.description) {
        blog.title = req.body.title;
    } else {
        blog.title = req.body.title;
        blog.description = req.body.description;
    }

    await blog.save();
    res.status(200).json({message: "Blog Updated Successfully", blog});
})


// listen server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

