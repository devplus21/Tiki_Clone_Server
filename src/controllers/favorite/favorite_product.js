const { default: mongoose } = require("mongoose");
const favorite_productModel = require("../../models/favorite_product.model");

module.exports.getToListFavorite = async (req, res) => {
    try {
        const data = await favorite_productModel.find({ user_id: req?.params?.id });
        return res.status(200).json({ message: 'Successfully!', data })

    } catch (error) {
        return res.status(400).json({ error: error })
    }
}

module.exports.addToListFavorite = async (req, res) => {
    const product = req?.body;
    const { user_id, product_id } = product;

    const favoriteProduct = new favorite_productModel(product);
    try {
        const favoriteListUserID = await favorite_productModel.findOne({ user_id, product_id })
        if (favoriteListUserID?.length) {
            return res.status(400).json({ message: 'Đã tồn tại' })
        } else {
            await favoriteProduct.save();
            return res.status(201).json(favoriteProduct);
        }


    } catch (error) {
        return res.status(400).json({ error: error })
    }
}

module.exports.deleteToListFavorite = async (req, res) => {
    try {
        await favorite_productModel.findOneAndRemove({ _id: req?.params?.id });
        return res.status(200).json({ message: 'Successfully!' })

    } catch (error) {
        return res.status(400).json({ error: error })
    }
}
