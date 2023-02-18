const mongoose = require('mongoose')
const config = require('../config')

const Course = require('./Course')

const RequestedCourseInstanceSchema = mongoose.Schema({

    studentId : {type : mongoose.Schema.Types.ObjectId , ref :  'Student' , required : true },
    certificate : { type : Blob , required : false  },
    isApprovedbyHOD : { type : Boolean , required : false  },
    isApprovedbyPrincipal : { type : Boolean , required : false  },
    isApproved : { type : Boolean , required : false  },
    permissionLetter : { type : Blob , required : false  },
    dateTime : { type : Date , required : false  },
     
})

module.exports = mongoose.model("RequestedCourseInstance"  , RequestedCourseInstanceSchema)