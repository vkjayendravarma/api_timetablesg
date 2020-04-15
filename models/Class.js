const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClassSchema = new Schema({
    year: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true,
    },
    roomno: {
        type: String,
        required: true,
    },
    timeTable: {
        mon: [{
            session: {
                type: Number,               
            },
            subject: {
                type: Schema.Types.ObjectId,
                ref: 'mySubject'
            },
            faculty: {
                type: Schema.Types.ObjectId,
                ref: 'myFaculty'
            },
            sessionType: {
                type: String
            },
            labNo: {
                type: Schema.Types.ObjectId,
                ref: 'myLab'
            }
        }],
        tue: [{
            session: {
                type: Number,
            },
            subject: {
                type: Schema.Types.ObjectId,
                ref: 'mySubject'
            },
            faculty: {
                type: Schema.Types.ObjectId,
                ref: 'myFaculty'
            },
            sessionType: {
                type: String
            },labNo: {
                type: Schema.Types.ObjectId,
                ref: 'myLab'
            }
        }],
        wed: [{
            session: {
                type: Number,
            },
            subject: {
                type: Schema.Types.ObjectId,
                ref: 'mySubject'
            },
            faculty: {
                type: Schema.Types.ObjectId,
                ref: 'myFaculty'
            },
            sessionType: {
                type: String
            },labNo: {
                type: Schema.Types.ObjectId,
                ref: 'myLab'
            }
        }],
        thu: [{
            session: {
                type: Number,
            },
            subject: {
                type: Schema.Types.ObjectId,
                ref: 'mySubject'
            },
            faculty: {
                type: Schema.Types.ObjectId,
                ref: 'myFaculty'
            },
            sessionType: {
                type: String
            },labNo: {
                type: Schema.Types.ObjectId,
                ref: 'myLab'
            }
        
        }],
        fri: [{
            session: {
                type: Number,
            },
            subject: {
                type: Schema.Types.ObjectId,
                ref: 'mySubject'
            },
            faculty: {
                type: Schema.Types.ObjectId,
                ref: 'myFaculty'
            },
            sessionType: {
                type: String
            },labNo: {
                type: Schema.Types.ObjectId,
                ref: 'myLab'
            }
        }],
        sat: [{
            session: {
                type: Number,
            },
            subject: {
                type: Schema.Types.ObjectId,
                ref: 'mySubject'
            },
            faculty: {
                type: Schema.Types.ObjectId,
                ref: 'myFaculty'
            },
            sessionType: {
                type: String
            },labNo: {
                type: Schema.Types.ObjectId,
                ref: 'myLab'
            }
        }],
    }
})

module.exports = Class = mongoose.model('myClass', ClassSchema, 'Classes')
