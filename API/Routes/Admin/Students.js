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


            // Will upsert ( update + insert ) ==> if exists update else insert document
            // If Error Occured return error message
            const registerStudents = new Promise((resolve, reject) => {

                let count = 0;

                temp.forEach(async (res) => {

                    res.password = CryptoJS.AES.encrypt(res.password + "", process.env.SECRET_KEY).toString()//Encryptes Password

                    await Student.updateOne(
                        { prn: res.prn },
                        { $set: { prn: res.prn, name: res.name, password: res.password, email: res.email, department: res.department, academicSession: res.academicSession } },
                        { upsert: true, runValidators: true })
                        .catch((e) => { reject({ msg: e.message }) })
                        .then(() => { console.log("Data Updated"); })

                    count++;

                    if (count == temp.length) resolve({ msg: "All Data Updated " })

                })


            })


            registerStudents
                .then((resposne) => { res.json(resposne) })
                .catch((e) => res.json(e))


        })

    }
    catch (error) {
        res.status(500).json("Something went wrong");
    }


})


// Update Student
/**
 *  Input --> { prn , name  , password , email , department  , academicSession }
 *  Output --> Either Error Message or Object --> { msg  }
 * 
 */

router.post('/updateStudent', async (req, res) => {

    const prn = req.body.prn

    await Student.updateOne({ prn }, { $set: req.body }, { runValidators: true }).then(() => {
        res.json(res.json("Updated Successfully"))
    }).catch((e) => {
        res.json(e)
    })


})



module.exports = router
