const mongoose = require('mongoose')
const config = require('../config')

const CourseSchema = mongoose.Schema({

    courseId : {type : String , required : true },
    courseName : { type : String , required : true},
    courseShortForm : { type : String , required : false},
    courseType : { type : String  , enum :{ values :  config.courseType , message : "Invalid CourseType" } , required : true },
    createdBy : { type : mongoose.Schema.Types.ObjectId , ref : 'Faculty' , required : true },
    assignedTo : { type : mongoose.Schema.Types.ObjectId , ref : 'Faculty' , required : true },
    academicSession : {type : String , required : true },
    department : { type : String , required : true},
    certificateTemplate : { type : String ,  required : true},

})

module.exports = mongoose.model("Course"  , CourseSchema)