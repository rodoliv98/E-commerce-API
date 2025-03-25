import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, 'ID is required'],
    },
    item: {
        type: String,
        required: [true, 'Item is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
})

const createPurchase = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name required'],
        trim: true,
    },
    cpf: {
        type: String,
        required: [true, 'CPF required'],
        min: 14,
        max: 14,
        trim: true,
    },
    birthDate: {
        type: String,
        required: [true, 'Birth date required'],
        min: 10,
        max: 10,
        trim: true,
    },
    country: {
        type: String,
        required: [true, 'Country required'],
        trim: true,
    },
    state: {
        type: String,
        required: [true, 'State required'],
        trim: true,
    },
    city: {
        type: String,
        required: [true, 'City required'],
        trim: true,
    },
    street: {
        type: String,
        required: [true, 'Street required'],
        trim: true,
    },
    houseNumber: {
        type: String,
        required: [true, 'House number required'],
        trim: true,
    },
    cep: {
        type: String,
        required: [true, 'CEP required'],
        min: 9,
        max: 9,
        trim: true,
    },
    cart: {
        type: [cartSchema],
        required: true,
    },
    card: {
        type: String,
        required: [true, 'Card number required'],
        min: 19,
        max: 19,
        trim: true,
    },
    total: {
        type: String,
        required: [true, 'Total value missing'],
        trim: true,
    },
    currency: {
        type: String,
        required: [true, 'Currency value missing'],
        trim: true
    },
    userID: {
        type: String,
        required: [true, 'UserID is required']
    },
    cart: {
        type: [cartSchema],
        required: true,
    },
}, { timestamps: true });

export const Purchase = mongoose.model("Purchase", createPurchase);