const express = require('express')
const router = express.Router()
const Category = require('../models/Category')
const Articles = require("../models/Articles")
const slugify = require('slugify')

router.get("/admin/articles", (req, res)=>{
    res.send("rota de artigos")
})

router.get("/admin/articles/new", (req, res)=>{
    Category.findAll().then(categories =>{
        res.render("admin/articles/new", { categories : categories})
        
    })
})

router.post("/articles/save", (req, res)=>{
  
    const title = req.body.title
    const body = req.body.body
    const category = req.body.category

    Articles.create({
        title : title,
        slug: slugify(title),
        body: body,
        categoryId: category
        
    }).then(()=> {
        res.redirect("/admin/articles/new")
    }).catch((err)=>{
        console.error(err);
        
    })

})

router.delete("/articles/delete", (req, res)=>{
    const id = req.params.id
    if (id != null) {
        Articles.destroy({
            where:{
                id :id
            }
        }
        ).then(()=>{
            res.render("")
        }).catch((err)=>{
            console.error(err);
            
        })
    }else{
        res.render("")
    }
    
})

module.exports = router