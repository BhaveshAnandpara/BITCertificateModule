const mongoose = require('mongoose')
const config = require('../config')

const StudentSchema = mongoose.Schema({

    prn : {type : String , required : true , unique : true},
    name : {type : String , required : true },
    password : {type : String , required : true },
    email : { type : String , required : true },
    department : { type : String , enum : config.departments , required : true},
    academicSession : {type : String , required : true },
    coursesInstances : { type : Array , required : false },

})

module.exports = mongoose.model("Student"  , StudentSchema)