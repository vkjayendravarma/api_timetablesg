const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FacultySchema = new Schema({
    employeeID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    shortname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subjectsDealing: [{
        type: Schema.Types.ObjectId,
        ref: "mySubject"
    }],
    hours: {
        type: Number,
        default: 0
    },
    timeTable: {
        mon: [{
            session: {
                type: Number,
            },
            class: {
                type: Schema.Types.ObjectId,
                    ref: "myClass"
            }
        }],
        tue: [{
            session: {
                type: Number,
            },
            class: {
                type: Schema.Types.ObjectId,
                    ref: "myClass"
            }
        }],

        wed: [{
            session: {
                type: Number,
            },
            class: {
                type: Schema.Types.ObjectId,
                    ref: "myClass"
            }
        }],

        thu: [{
            session: {
                type: Number,
            },
            class: {
                type: Schema.Types.ObjectId,
                    ref: "myClass"
            }
        }],

        fri: [{
            session: {
                type: Number,
            },
            class: {
                type: Schema.Types.ObjectId,
                    ref: "myClass"
            }
        }],

        sat: [{
            session: {
                type: Number,
            },
            class: {
                type: Schema.Types.ObjectId,
                    ref: "myClass"
            }
        }]
    }
})

module.exports = Faculty = mongoose.model('myFaculty', FacultySchema)