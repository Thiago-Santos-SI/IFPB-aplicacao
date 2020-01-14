const express = require('express')
const router = express.Router()
const category = require("../models/Category")
const slugify = require('slugify')


router.get("/admin/categories/new", (req, res)=>{
    res.render("admin/categories/new")
})

router.post("/categories/save",  (req, res)=>{
    var title = req.body.title;
    if(title != null){

        category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/admin/categories")
        })

    }else{
        res.redirect("/admin/categories/new")
    }
})

router.get("/admin/categories", (req, res)=>{
    category.findAll().then(categories =>{
        res.render("admin/categories/index", {categories: categories})
    })

    
})

router.post("/categories/delete", (req, res)=>{
    const id = req.body.id
    if(id != null){
        if (!isNaN(id)) {
        // destroy = methodo delete interno
            category.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect("/admin/categories")
            })

            res.redirect("/admin/categories")
        }
    }else{
        res.redirect("/admin/categories")
    }
})

router.get("/admin/categories/edit/:id", (req, res)=>{
    const id = req.params.id

    if (isNaN(id)) {
        res.redirect("/admin/categories")
    }
    //findByPk = procura um id especifico no nosso banco de dados
    category.findByPk(id).then(category =>{
        if (category != undefined) {
            
            res.render("admin/categories/edit", {category: category})

        }else{
            res.redirect("/admin/categories")
        }
    }).catch(erro =>{
        res.redirect("/admin/categories")
    })
})

router.post("/categories/update", (req, res)=>{
    const id = req.body.id
    const title = req.body.title
    const slug = req.body.slug

    category.update({title: title, slug: slugify(title)}, {
        where:{
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/categories")
    }).catch((err)=>{
        console.error(err);
        
    })

})


module.exports = router;