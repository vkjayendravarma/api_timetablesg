const express = require('express')
const router = express.Router()

const Class = require('../../models/Class')
const Faculty = require('../../models/Faculty')
const Lab = require('../../models/Lab')
// @type : GET
// @route: /api/labs
// @desc: get all classe
// @access: PUBLIC
router.get('/', (req, res) => {
    res.send(" Labs working")
})

// @type : POST
// @route: /api/labs/new/lab
// @desc: generate new lab
// @access: PUBLIC

router.post('/new/lab', (req, res) => {
    let newLab = req.body
    newLab.schedule = []
    
    Lab.findOne({roomNo: newLab.roomNo}).then((lab) => {
        if(lab){
            res.status(400).json({
                success: false,
                message: 'Lab exists'
            })
        }else{
            new Lab(newLab).save().then((lab) => {
                res.status(200).json({
                    success: true,
                    message: 'Lab created'
                })
            }).catch(err => console.log('err in saving new lab '+ err))
        }
    }).catch(err => console.log('Err in new lab ' +err))
    
})

module.exports = router