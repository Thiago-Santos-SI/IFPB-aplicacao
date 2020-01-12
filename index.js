const ejs = require('ejs')
const bodyParser = require('body-parser')
const express = require('express');
const connection = require('./database/database')
const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')
const articles = require('./articles/Articles')
const categories = require('./categories/Category')


const app = express();

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

connection.authenticate().then(()=>{
    console.log("conexão feita com sucesso");

}).catch((error)=>{
    console.error(error);
})

app.use("/", categoriesController)
app.use("/", articlesController)

app.get("/", (req, res)=>{
    res.render("index")
})

app.listen(3000, ()=>{
    console.log('o servidor está rodando')
})