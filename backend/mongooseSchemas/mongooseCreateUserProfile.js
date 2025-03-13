import mongoose from "mongoose"

const profileSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [function() { return this.isNew; }, 'Full name required'],
        trim: true,
    },
    cpf: {
        type: String,
        required: [function() { return this.isNew; }, 'Cpf is needed'],
        trim: true,
    },
    birthDate: {
        type: String,
        required: [function() { return this.isNew; }, 'Birthdate is required'],
        trim: true,
    },
    userID: {
        type: String,
        required: true,
    }
})

export const Profile = mongoose.model("Profile", profileSchema)