//Dependencies
const router = require('express').Router()
const multer = require('multer')
const reader = require('xlsx')
const fs = require('fs')

//Models
const Faculty = require('../../Models/Faculty')


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




// Register
/**
 *  Input --> { name ,password ,email ,department ,roles ,signature }
 *  Output --> Either Error Message or Object --> { msg  }
 * 
 */

router.post('/registerFaculty', async (req, res) => {

    try {

        const upload = multer({storage}).array( 'file' )

        upload(req, res, () => {

            const excelFile = req.files[0]
            const sign = req.files[1]

            // console.log( sign.path );

            const file = reader.readFile(excelFile.path)
            const signature = fs.readFileSync( sign.path ) 

            const temp = reader.utils.sheet_to_json(

                file.Sheets[file.SheetNames[0]])


            // Will upsert ( update + insert ) ==> if exists update else insert document
            // If Error Occured return error message
            const registerFaculties = new Promise((resolve, reject) => {

                let count = 0;

                temp.forEach(async (res) => {

                    await Faculty.updateOne(
                        { email: res.email },
                        { $set: { name: res.name , password: res.password , email: res.email , department: res.department , roles: res.roles , signature  } },
                        { upsert: true, runValidators: true })
                        .catch((e) => { reject( {msg : e.message } ) })
                        .then(() => { console.log( "Data Updated" ); })

                    count++;

                    if (count == temp.length) resolve({ msg: "All Data Updated " })

                })


            })


            registerFaculties
            .then((resposne) => { res.json(resposne) })
            .catch((e) => res.json(e))


        })

    }
    catch (error) {
        res.status(500).json("Something went wrong");
    }


})


// Update Faculty
/**
 *  Input --> { name ,password ,email ,department ,roles ,signature }
 *  Output --> Either Error Message or Object --> { msg  }
 * 
 */

router.post( '/updateFaculty' , async( req,res)=>{

    const email = req.body.email

        await Faculty.updateOne( { email }  , { $set : req.body  } , { runValidators : true } ).catch((e)=>{
            res.send( e )
        }).then(()=>{
            res.json("Updated Successfully") 
        })


})



module.exports = router
