//Dependencies
const router = require('express').Router()
const multer = require('multer')
const reader = require('xlsx')
const fs = require('fs')

//Models
const Faculty = require('../../Models/Faculty')
const Course = require('../../Models/Course')


//Multer Storage and Configartions

const directory = './Assets/CertificateTemplate'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, directory)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


// Add Course
/**
 *  Input --> { courseId, courseName, courseShortForm, courseType, createdBy, assignedTo, academicSession, department, certificateTemplate }
 *  Output --> Either Error Message or Object --> { msg  }
 * 
 */

router.post('/addCourse', async (req, res) => {

    const upload = multer({ storage }).single('file')

    upload( req, res , async () => {

        let template = req.file
        template = fs.readFileSync(template.path)


        if (await Course.findOne({ courseId: req.body.courseId, academicSession: req.body.academicSession })) {

            res.json("Course Already Exists")

        }
        else {


            const newCourse = new Course({
                courseId: req.body.courseId,
                courseName: req.body.courseName,
                courseShortForm: req.body.courseShortForm,
                courseType: req.body.courseType,
                createdBy: req.body.createdBy,
                assignedTo: req.body.assignedTo,
                academicSession: req.body.academicSession,
                department: req.body.department,
                certificateTemplate: template
            })

            newCourse.save().then((result) => {

                res.json('Course Added')

            }).catch((err) => {
                res.json(err)
            });

        }


    })

})





module.exports = router
