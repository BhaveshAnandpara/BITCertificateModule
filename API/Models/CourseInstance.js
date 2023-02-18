const mongoose = require('mongoose')
const config = require('../config')

const Course = require('./Course')

const CourseInstanceSchema = mongoose.Schema({

    courseId : {type : mongoose.Schema.Types.ObjectId , ref :  'Course' , required : true },
    studentId : {type : mongoose.Schema.Types.ObjectId , ref :  'Student' , required : true },
    gardes : { type : String , required : false  },
    certificate : { type : Blob , required : false  },

})

module.exports = mongoose.model("CourseInstance"  , CourseInstanceSchema)