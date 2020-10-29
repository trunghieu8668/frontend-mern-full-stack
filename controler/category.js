const Category = require('../models/category')
const { errorHandler } = require('../helpers/dbErrorHandle');

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((error, category) =>{
        if(error || !category) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        req.category = category;
        next();
    })
}

exports.create = (req, res) =>{
    const category = new Category(req.body);
    category.save((error, data) => {
        if(error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json({data});
    })
}

exports.read = (req, res) =>{
    return res.json(req.category);
}

exports.update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((error, data)=>{
        if(error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data);
    })
}

exports.remove = (req, res) => {
    const category = req.category;
    category.remove((error, data)=>{
        if(error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json({
            data,
            message: "Category deleted"
        });
    })
}

exports.list = (req, res) => {
    Category.find().exec((error, data)=>{
        if(error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data);
    })
}
