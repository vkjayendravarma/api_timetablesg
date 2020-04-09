const express = require('express')
const router = express.Router()

const Class = require('../../models/Class')
const Faculty = require('../../models/Faculty')
const Subject = require('../../models/Subject')
const Lab = require('../../models/Lab')
// @type : GET
// @route: /api/classes
// @desc: get all classe
// @access: PUBLIC
router.get('/', (req, res) => {
    Class.find().then((classu) => {
        res.status(200).json({
            success: true,
            result: classu
        })
    }).catch(err => console.log('err in getting classes'))
})

// @type : POST
// @route: /api/classes/new/class
// @desc: generate new class
// @access: PUBLIC

router.post('/new/class', (req, res) => {
    let newClass = req.body
    Class.findOne({
        $and: [{
            year: newClass.year
        }, {
            section: newClass.section
        }]
    }).then((exiClass) => {

        if (exiClass) {
            res.status(400).json({
                success: false,
                message: "class exists"
            })
        } else {
            Class.findOne({
                roomno: newClass.roomno
            }).then((room) => {
                if (room) {
                    res.status(400).json({
                        success: false,
                        message: `room occupied by ${room.year} ${room.section}`
                    })
                } else {
                    new Class(newClass).save().then(() => {
                        res.status(200).json({
                            success: true,
                            message: 'Class created'
                        })
                    }).catch(err => console.log('err in new class save ' + err))
                }
            }).catch(err => console.log('query room no ' + err))

        }
    }).catch(err => console.log('err in new class' + err))
})

// @type : POST
// @route: /api/classes/update/class/timetable/
// @desc: timetable for class
// @access: PUBLIC

router.post('/update/class/timetable/', (req, res) => {
    let newSession = req.body

    Faculty.findOne({
        employeeID: newSession.employeeID
    }).then((faculty) => {
        // check faculty availability
        let isAvail = true
        isAvailloop = faculty.timeTable[newSession.day]
        if (isAvailloop) {
            isAvailloop.forEach(element => {
                if (element.session == newSession.session)
                    isAvail = false
            })
        }
        if (isAvail == false) {
            res.status(400).json({
                success: false,
                message: 'Faculty not available'
            })
        } else {
            //if faculty available
            Class.findById(newSession.classId).then((myClass) => { //get class by classId

                if (myClass.timeTable[newSession.day] == undefined) {
                    myClass.timeTable[newSession.day] = []
                }
                if (faculty.timeTable[newSession.day] == undefined) {
                    faculty.timeTable[newSession.day] = []
                }
                classExists = myClass.timeTable[newSession.day].filter(hour => parseInt(hour.session) == parseInt(newSession.session))
                if (classExists.length) {
                    res.status(400).json({
                        success: false,
                        message: 'Session already exists',
                        res: classExists
                    })
                    return
                }
                Subject.findOne({
                    code: newSession.code
                }).then((subject) => { //get subject by code  
                    if (newSession.sessionType == 'lab') {
                        classExists = myClass.timeTable[newSession.day].filter(hour => parseInt(hour.session) == (parseInt(newSession.session) + 1) || parseInt(hour.session) == (parseInt(newSession.session) + 2))
                        if (classExists.length) {
                            res.status(400).json({
                                success: false,
                                message: 'Session already exists lab'
                            })
                            return
                        }
                        Lab.findOne({
                            roomNo: newSession.labNo
                        }).then((lab) => {
                            if (lab) {

                                if (newSession.session < 4) mngOReng = 'mng'
                                else mngOReng = 'eng'

                                isLabAvil = lab.schedule[newSession.day]

                                if (isLabAvil[mngOReng]) {
                                    res.status(400).json({
                                        success: false,
                                        message: 'Lab not available'
                                    })
                                } else {

                                    myClass.timeTable[newSession.day].push({
                                        session: newSession.session,
                                        subject: subject.id,
                                        faculty: faculty.id,
                                        sessionType: newSession.sessionType,
                                        labNo: lab.id
                                    })
                                    myClass.timeTable[newSession.day].push({
                                        session: 1 + parseInt(newSession.session),
                                        subject: subject.id,
                                        faculty: faculty.id,
                                        sessionType: newSession.sessionType,
                                        labNo: lab.id
                                    })
                                    myClass.timeTable[newSession.day].push({
                                        session: 2 + parseInt(newSession.session),
                                        subject: subject.id,
                                        faculty: faculty.id,
                                        sessionType: newSession.sessionType,
                                        labNo: lab.id
                                    })
                                    faculty.timeTable[newSession.day].unshift({
                                        session: parseInt(newSession.session),
                                        class: myClass.id
                                    })
                                    faculty.timeTable[newSession.day].unshift({
                                        session: parseInt(newSession.session) + 1,
                                        class: myClass.id
                                    })
                                    faculty.timeTable[newSession.day].unshift({
                                        session: parseInt(newSession.session) + 2,
                                        class: myClass.id
                                    })

                                    faculty.hours = faculty.hours + 3

                                }

                                lab.schedule[newSession.day].mngOReng = myClass.id

                                faculty.save().then(() => {
                                    myClass.save().then((classu) => {
                                        lab.save().then(() => {
                                            res.status(200).json({
                                                success: true,
                                                message: 'class timetable updated',
                                                result: classu
                                            })
                                        }).catch(err => console.log('lab save ' + err))
                                    }).catch(err => console.log('myClass save ' + err))
                                }).catch(err => console.log('faculty save ' + err))

                            } else {
                                res.status(404).json({
                                    success: false,
                                    message: "lab not found"
                                })
                            }


                        }).catch(err => console.log('err in lab ' + err))



                    } else {

                        myClassnewSessionUpdate = {
                            session: newSession.session,
                            subject: subject.id,
                            faculty: faculty.id,
                            sessionType: newSession.sessionType
                        }

                        myClass.timeTable[newSession.day].unshift(myClassnewSessionUpdate)
                        facultyTimetableUpdate = {
                            session: newSession.session,
                            class: myClass.id
                        }

                        faculty.timeTable[newSession.day].unshift(facultyTimetableUpdate)
                        faculty.hours = faculty.hours + 1

                        faculty.save().then(() => {
                            myClass.save().then((classu) => {
                                res.status(200).json({
                                    success: true,
                                    message: 'class timetable updated',
                                    result: classu
                                })
                            }).catch(err => console.log('myClass save ' + err))
                        }).catch(err => console.log('faculty save class ' + err))
                    }
                }).catch(err => console.log('err in getting subject ' + err))
            }).catch(err => console.log('err in getting class ' + err))
        }
    }).catch(err => console.log('err in getting faculty id ' + err))

})

// @type : DELETE
// @route: /api/classes/delete/class/timetable/session
// @desc: timetable for class
// @access: PUBLIC


router.delete('/delete/class/timetable/session', (req, res) => {
    sessionToDelete = req.body

    Class.findById(sessionToDelete.classID).then((delClass) => {
        if (delClass) {
            
            toDelete = delClass.timeTable[sessionToDelete.day].filter(hr => parseInt(hr.session) == parseInt(sessionToDelete.session))
            
            if (toDelete.length) {
                toDelete = toDelete[0]
                
                Faculty.findById(toDelete.faculty).then((faculty)=> {
                    
                    if (toDelete.sessionType == 'lab') {
                        
                        // fix this shit asshole 
                        updatedClass = delClass.timeTable[sessionToDelete.day].filter(hr => { return parseInt(hr.session) !== parseInt(sessionToDelete.session) || parseInt(hr.session) !== (parseInt(sessionToDelete.session) + 1) || parseInt(hr.session) !== (parseInt(sessionToDelete.session) + 2)})
                        updatedFaculty = faculty.timeTable[sessionToDelete.day].filter(hr => { return parseInt(hr.session) !== parseInt(sessionToDelete.session) || parseInt(hr.session) !== (parseInt(sessionToDelete.session) + 1) || parseInt(hr.session) !== (parseInt(sessionToDelete.session) + 2)}) 
                    } else {
                        updatedClass = delClass.timeTable[sessionToDelete.day].filter(hr => { return parseInt(hr.session) !== parseInt(sessionToDelete.session)})
                        updatedFaculty = faculty.timeTable[sessionToDelete.day].filter(hr => { return parseInt(hr.session) !== parseInt(sessionToDelete.session)})
                    }
                    delClass.timeTable[sessionToDelete.day] = updatedClass
                    faculty.timeTable[sessionToDelete.day] = updatedFaculty
                    console.log(updatedClass);
                    console.log(updatedFaculty.length);
                    
                    

                    faculty.save().then((faculty) => {
                        delClass.save().then((updated) => {
                            res.status(200).json({
                                success: true,
                                result: updated,
                                faculty: faculty
                            })
                        }).catch(err => console.log('err in saving updated ' +err))
                    }).catch(err => console.log('err in saving faculty ' + err))
    
                    
                
                }).catch(err => console.log('err in geting faculty ' + err))

                

            } else {
                res.status(404).json({
                    session: false,
                    message: 'Session not found'
                })
            }
        } else{
            res.status(404).json({
                session: false,
                message: 'class not found'
            })
        }
    }).catch(err => console.log('Err in finding class ' + err))
})

module.exports = router