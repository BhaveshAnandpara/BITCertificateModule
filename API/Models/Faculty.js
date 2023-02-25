const mongoose = require('mongoose')
const config = require('../config')

const FacultySchema = mongoose.Schema({

    name : {type : String , required : true },
    password : {type : String , required : true },
    email : { type : String , required : true, unique : true },
    department : { type : String  , enum :{ values :  config.departments , message : "Department Invalid" } , required : true},
    roles : { type : String , enum :{ values :  config.roles , message : "Invalid Role" } , required : true },
    signature : { type : Buffer ,  required : true },

})

module.exports = mongoose.model("Faculty"  , FacultySchema)