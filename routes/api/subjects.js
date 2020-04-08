const express = require('express')
const router = express.Router()

const Subject = require('../../models/Subject')

// @type : GET
// @route: /api/subjects
// @desc: get all subjects
// @access: PUBLIC

router.get('/', (req, res) => {
    Subject.find().populate('faculty', ['employeeID','name', 'shortname']).then(subject => {
        if(subject){
            res.status(200).json({
                success:true,
                result: subject
            })
        }else{
            res.status(404).json({
                success:false,
                message: 'No subjects created'
            })
        }
    }).catch(err => console.log("err in getting all subjects " + err))
})

// @type : POST
// @route: /api/subjects/newsubject
// @desc: New subject
// @access: PUBLIC

router.post('/newsubject', (req, res) => {
    let newSubject = req.body
    Subject.findOne({code: newSubject.code}).then(subject => {
        if(subject){
            res.status(400).json({
                success: false,
                message: "Subject already exists"
            })
        }else{
            new Subject(newSubject).save().then((subject) => {
                res.status(200).json({
                    success: true,
                    message: "Subject created"
                })
            }).catch(err => console.log('err in saving subject ' + err))
        }
    }).catch(err => console.log("Subject post err " + err))
})

// @type : DELETE
// @route: /api/subjects/delete/:code
// @desc: Delete subject
// @access: PUBLIC

router.delete('/delete/:code', (req, res) => {
    Subject.findOneAndRemove({code: req.params.code}).then((subject) => {
        if(subject){
            res.status(200).json({
                success:true,
                message: "delete success"
            })
        }else{
            res.status(200).json({
                success:false,
                message: "No subject found"
            })
        }
    }).catch(err => console.log("err in delete" + err))
})



module.exports = router