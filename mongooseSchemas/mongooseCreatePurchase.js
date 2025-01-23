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
    userID: {
        type: String,
        required: [true, 'UserID is required']
    }
})

const addressSchema = new mongoose.Schema({
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
    },
    street: {
        type: String,
        required: [true, 'Street is required'],
        trim: true,
    },
    houseNumber: {
        type: Number,
        min: 1,
        max: 9999,
    }
})

const personSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name required'],
        trim: true,
    },
    cpf: {
        type: String,
        required: [true, 'Cpf is needed'],
        trim: true,
    },
    birthDate: {
        type: String,
        required: [true, 'Birthdate is required'],
        trim: true,
    },
    address: {
        type: addressSchema,
        required: true,
    }
})

const createPurchase = new mongoose.Schema({
    person: {
        type: personSchema,
        required: true,
    },
    cart: {
        type: [cartSchema],
        required: true,
    },
    card: {
        type: String,
        required: [true, 'Card number required'],
        min: 16,
        max: 16,
        trim: true,
    },
    total: {
        type: Number,
        required: [true, 'Total value missing'],
        trim: true,
    }
})

export const Purchase = mongoose.model("Purchase", createPurchase);