const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClassSchema = new Schema({
    year: {
        type: String,
        required: true
    },
    section:{
        type: String,
        required: true,
    },
    roomno:{
        type: String,
    },
    timeTable: {
        mon: [
            {
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
                }
            }
        ],
        tue: [
            {
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
                }
            }
        ],
        wed: [
            {
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
                }
            }
        ],
        thu: [
            {
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
                }
            }
        ],
        fri: [
            {
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
                }
            }
        ],
        sat: [
            {
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
                }
            }
        ],
    }
})

module.exports = Class = mongoose.model('myClass', ClassSchema)
