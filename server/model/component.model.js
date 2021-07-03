const mongoose = require('mongoose')
const validator = require('validator')
const componentSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        lowercase: true,
        trim: true
    },
    code:{
        type: mongoose.SchemaTypes.Mixed,
        required: true,
        trim: true
    }
})

//creating model of moongoose and then creating an instance of model and then saving it
const Component = mongoose.model('Component',componentSchema)

module.exports = Component