import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
    country: {
        type: String,
        required: [function() { return this.isNew; }, 'Country is required'],
        trim: true,
    },
    state: {
        type: String,
        required: [function() { return this.isNew; }, 'State is required'],
        trim: true,
    },
    city: {
        type: String,
        required: [function() { return this.isNew; }, 'City is required'],
        trim: true,
    },
    street: {
        type: String,
        required: [function() { return this.isNew; }, 'Street is required'],
        trim: true,
    },
    houseNumber: {
        type: Number,
        required: [function() { return this.isNew; }, 'House number is required'],
        min: 1,
        max: 9999,
    },
    userID: {
        type: String,
        required: true,
    }
})

export const Address = mongoose.model("Address", addressSchema)