import mongoose from "mongoose"

const createMongoProductModel = new mongoose.Schema({
    item: {
        type: String,
        required: [function() { return this.isNew; }, 'Item required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [function() { return this.isNew; }, 'Price required'],
        trim: true,
    },
    quantity: {
        type: Number,
        min: 1,
        trim: true
    },
    imagePath: {
        type: String,
        required: [function() { return this.isNew; }, 'Path required'],
        trim: true
    },
    category: {
        type: String,
        required: [function() { return this.isNew; }, 'Category is needed'],
        trim: true
    }
})

export const Product = mongoose.model("Product", createMongoProductModel)