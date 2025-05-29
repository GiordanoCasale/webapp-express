const express = require('express');

const app = express();

const port = 3000;

const postsRouter = require('./routers/posts');

app.use(express.json());

app.use("/posts", postsRouter)

app.use(express.static("public"));


app.get("/", (req, res) => {

    res.send("benvenuti nel mio blog")
});

app.listen(port, () => {
    console.log(`server del blog in ascolto alla porta ${port}`);

});