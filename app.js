const express = require('express');

const app = express();

const port = 3000;

const postsRouter = require('./routers/movies');

app.use(express.json());

app.use("/posts", postsRouter)

app.use(express.static("public"));


app.get("/", (req, res) => {

    res.send("benvenuti nel mio catalogo")
});

app.listen(port, () => {
    console.log(`server del catalogo in ascolto alla porta ${port}`);

});