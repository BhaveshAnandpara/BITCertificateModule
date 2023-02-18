const mongoose = require('mongoose')
const config = require('../config')

const FacultySchema = mongoose.Schema({

    name : {type : String , required : true },
    password : {type : String , required : true },
    email : { type : String , required : true },
    department : { type : String , enum : config.departments , required : true},
    roles : { type : String , enum : config.roles , required : true },
    signature : { type : Blob ,  required : true },

})

module.exports = mongoose.model("Faculty"  , FacultySchema)