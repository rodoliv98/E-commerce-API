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
    }
})

export const Product = mongoose.model("Product", createMongoProductModel)