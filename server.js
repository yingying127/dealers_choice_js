const express = require("express");
const app = express();
const morgan = require('morgan')
const postBank = require('./postBank')

app.use(morgan('dev'));

app.use(express.static('public'))

app.get('/', (req, res) => {
    const posts = postBank.list()
    res.send(`
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
                        <p><a href="/books/${post.id}">${post.name}${post.title}</a></p>
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
    if (!post.id) {
        res.status(404)
        const html = `
        <html class="bg">
        <head>
            <title>Page Not Found</title>
            <link rel ="stylesheet" href="/style.css" />
        </head>
        <body>
            <div class="not-found">
            <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
            <img src="/dumbledore.gif" />
      </div>
        </body>
        </html>`
        res.send(html)
    } else {
    res.send(`
    <html>
    <head>
        <title>Wizarding World of Harry Potter</title>
        <link rel ="stylesheet" href="/style.css" />
    </head>
        <body>
            <div class="title">
            <header><a href="/">${post.name}</a>${post.title}</header>
            ${posts.map(post => `
                <div class="content">
                    <p>${post.content}</p>
                </div>`
            ).join('')}
            </div>
        </body>
    </html>
    `)}
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(`
    <html>
        <head>
            <title>Page Not Found</title>
            <link rel ="stylesheet" href="/style.css" />
        </head>
        <body>
            <div class="not-found">
            <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
            <img src="/dumbledore.gif" />
      </div>
        </body>
        </html>
    `)
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})