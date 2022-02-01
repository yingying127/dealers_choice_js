const express = require("express");
const app = express();
const morgan = require('morgan')
const postBank = require('./postBank')

app.use(morgan('dev'));

app.use(express.static('public'))


app.get('/', (req, res) => {
    const posts = postBank.list()
    res.send(`
    <html>
    <head>
        <title>Wizarding World of Harry Potter</title>
        <link rel ="stylesheet" href="/style.css" />
    </head>
        <body>
            <div class="title">
            <header>Harry Potter Books</header>
            ${posts.map(post => `
                <div class="info">
                    <p>
                        ${post.title}
                    </p>
                    <small class="date">
                        Release Year: ${post.release}
                    </small>
                </div>`
            ).join('')}
            </div>
        </body>
    </html>
    `)
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})