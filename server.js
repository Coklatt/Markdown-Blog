const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { articles: articles });
});

app.use('/articles', articleRouter);
app.get('/status', (req, res) => res.json({ status: 'running' }));

app.listen(PORT, HOST, () => console.log(`Listening on port ${PORT}`));
