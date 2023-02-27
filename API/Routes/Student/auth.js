//Dependencies
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')
const dotenv = require('dotenv').config()
const multer = require('multer')
const reader = require('xlsx')
const fs = require('fs')


//Models
const Student = require('../../Models/Student')


//Multer Storage and Configartions

const directory = './Assets/StudentData'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, directory)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


const upload = multer({ storage: storage }).single('file')


// Register
/**
 *  Input --> { prn , name  , password , email , department  , academicSession }
 *  Output --> Either Error Message or Object --> { msg  }
 * 
 */

router.post('/registerStudents', async (req, res) => {

    try {

        upload(req, res, () => {

            const excelFile = req.file

            const file = reader.readFile(excelFile.path)

            const temp = reader.utils.sheet_to_json(

                file.Sheets[file.SheetNames[0]])

            let newStudent;

            temp.forEach(async (res) => {

                console.log(res);
                newStudent = new Student(res)
                await newStudent.save()

            })

            res.json({ msg: 'Data Added' })

        })

    }
    catch (error) {
        res.status(500).json("Something went wrong");
    }


})



// login
/**
 *  Input --> Prn and password
 *  Output --> Either Error Message or Object --> { msg , accessToken , isAuthenticated }
 * 
 */


router.post('/studentLogin', async (req, res) => {

    const prn = req.body.userId
    const password = req.body.password


    await Student.findOne({ prn })
        .then((result) => {

            var bytes = CryptoJS.AES.decrypt(result.password, process.env.SECRET_KEY); //Decrypt the Encrypted Password
            var originalPass = bytes.toString(CryptoJS.enc.Utf8); //Original Password

            console.log( originalPass );

            if (originalPass !== password)
                res.json({ msg: "Incorrect Password", isAuthenticated: false })

            else {

                const accessToken = jwt.sign({ studentData: result }, `${process.env.JWT_AUTH_TOKEN}`, { expiresIn: '1d' })

                res.json({ msg: "Login Sucessfull", accessToken, isAuthenticated: true })
            }

        })
        .catch((e) => { res.json({ msg: "PRN is Incorrect", isAuthenticated: false }) })


})



module.exports = router