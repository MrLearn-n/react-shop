const uuid = require('uuid');
const path = require('path');
const {Product} = require('./../models/models');
const ApiError = require ('./../error/ApiError');

class ProductController {
    async create (req, res, next) {
        try {
            const { name, price, typeId } = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const product = await Product.create({name, price, typeId, img: fileName});

            return res.json(product);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll (req, res) {
        const {typeId} = req.body
        
        let product;

        if(typeId) {
            product= await Product.findAll({where: {typeId}});
        }

        return res.json(product);
    }

    async getOne (req, res) {
        
    }
}

module.exports = new ProductController ();