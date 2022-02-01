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
                        <p><a href="/books/${post.id}">Book ${post.id}:</a></p>
                        <p><a href="/books/${post.id}">${post.title}</a></p>
                        <small class="date">
                            ${post.author} | Release Year: ${post.release}
                        </small>
                </div>`
            ).join('')}
            </div>
        </body>
    </html>
    `)
})

app.get('/books/:id', (req, res) => {
    const post = postBank.find(req.params.id);
    const posts = [ post ]
    res.send(`
    <html>
    <head>
        <title>Wizarding World of Harry Potter</title>
        <link rel ="stylesheet" href="/style.css" />
    </head>
        <body>
            <div class="title">
            <header>${post.title}</header>
            ${posts.map(post => `
                <div class="content">
                    <p>${post.content}</p>
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