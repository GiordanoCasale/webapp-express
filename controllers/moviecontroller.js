const connection = require("../data/db");

const index = (req, res) => {
    const sql = `
    SELECT M.*, ROUND(AVG(R.vote), 1) as average_vote
    FROM movies M
    LEFT JOIN reviews R ON R.movie_id = M.id
    GROUP BY M.id
`;
    connection.query(sql, (err, moviesResult) => {
        if (err) return res.status(500).json({ error: "Database Query Failed:" + err });

        const movies = moviesResult.map(movie => {
            const obj = { ...movie };
            obj.image = req.imagePath + obj.image;
            return obj;
        })

        res.json(movies);
    })
}

const show = (req, res) => {
    const { id } = req.params

    const movieSql = `
    SELECT M.*, ROUND(AVG(R.vote), 1) as average_vote
    FROM movies M
    LEFT JOIN reviews R ON R.movie_id = M.id
    GROUP BY M.id
`;

    const reviewSql = 'SELECT * FROM reviews WHERE movie_id = ?';

    connection.query(movieSql, [id], (err, movieResult) => {
        if (err) return res.status(500).json({ error: "Database Query Failed:" + err });

        if (movieResult.length === 0) return res.status(404).json({ error: "Movie not found" });

        const movie = movieResult[0];

        movie.image = req.imagePath + movie.image;

        connection.query(reviewSql, [id], (err, reviewResult) => {
            if (err) return res.status(500).json({ error: "Database Query Failed:" + err });
            movie.reviews = reviewResult;
            res.json(movie);
        })
    })
}

module.exports = {
    index,
    show
}
