const express = require('express')
const router = express.Router()

const Faculty = require('../../models/Faculty')
const Subject = require('../../models/Subject')

// @type : GET
// @route: /api/faculty
// @desc: get all faculty
// @access: PUBLIC
router.get('/', (req, res) => {
    Faculty.find()
    .populate('subjectsDealing').then((faculty) => {
        if(faculty){
            res.status(200).json({
                success: true,
                result: faculty
            })
        }else{
            res.status(200).json({
                success: false,
                message: "No faculty"
            })
        }
    }).catch(err => console.log("Err in getting all faculty"))
})

// @type : POST
// @route: /api/faculty/newfaculty
// @desc: create new faculty
// @access: PUBLIC

router.post('/create/newfaculty',(req, res) => {
    let newFaculty = req.body

    Faculty.findOne({employeeID: newFaculty.employeeID}).then((faculty) => {
        if(faculty){
            res.status(400).json({
                success: false,
                message: "Employee already exists"
            })
        }else{
            new Faculty(newFaculty).save().then((faculty) => {
                res.status(200).json({
                    success:true,
                    message: "Faculty created"
                })
            }).catch(err => console.log('err in new faculty saving ' + err))
        }
    }).catch(err => console.log("err in newFaculty " + err))
})


// @type : POST
// @route: /api/faculty/update/faculty/new/subject/:employeeID
// @desc: update faculty dealing subjects
// @access: PUBLIC

router.post("/update/faculty/new/subject/:employeeID", (req, res) => {
    
    Faculty.findOne({employeeID: req.params.employeeID}).then((faculty) => {
        let allSubjects = faculty.subjectsDealing

        Subject.findOne({code: req.body.code}).then((subject) => {
            if(subject){

                if(allSubjects.includes(subject.id)){
                    res.status(400).json({
                        success: false,
                        message: "Subject already dealing"
                    })
                }
                else{
                    faculty.subjectsDealing.push(subject.id)
                    faculty.save().then((faculty) => {
                        res.status(200).json({
                            success: true,
                            result: faculty
                        })
                    }).catch(err => console.log('err on adding new subject to faculty ' + err))
                }
            }else{
                res.status(404).json({
                    success:false,
                    message: 'No subject found'
                })
            }
        
        }).catch(err => console.log("err in geing subjects " +err))
        
    }).catch(err => console.log('err in adding new subject to faculty ' + err))

})



module.exports = router