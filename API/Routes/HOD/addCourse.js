//Dependencies
const router = require('express').Router()
const multer = require('multer')
const reader = require('xlsx')
var nodemailer = require('nodemailer');
const fs = require('fs')


const { email, mailOptions } = require('../../mailConfig')

//Models
const Faculty = require('../../Models/Faculty')
const Course = require('../../Models/Course')


//Mail
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: process.env.GMAIL_PASS
    }
});

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

    upload(req, res, async () => {

        let template = req.file
        template = fs.readFileSync(template.path) //Convert Template Into Binary Data


        if (await Course.findOne({ courseId: req.body.courseId, academicSession: req.body.academicSession })) { //If course Already Exists

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

            newCourse.save().then(async (result) => {

                console.log('Course Added')

                try {

                    const faculty = await Faculty.findById(req.body.assignedTo)
                    let courses = faculty.course != null ? faculty.course : []

                    courses.push(newCourse._id) // Added CourseId into Faculty Schema

                    await Faculty.findByIdAndUpdate(req.body.assignedTo, { $set: { course: courses } }).then((result) => {

                        try {

                            const mailInfo = mailOptions(faculty.email , newCourse )

                            transporter.sendMail( mailInfo, function (error, info) {
                                if (error) {
                                    console.log(error);
                                    res.send('Error While Sending Mail to Assigned Faculty') // if error occurs send error as response to client
                                }
                                else {
                                    console.log('Email sent');
                                }
                            })

                        } catch (e) {
                            res.json("Error Occured")
                        }

                        res.json("Faculty Assigned");

                    }).catch(e => {
                        res.json(e);
                    })

                } catch (e) {

                    console.log(e);
                    res.json(e)

                }


            }).catch((err) => {
                res.json(err)
            });

        }


    })

})





module.exports = router
