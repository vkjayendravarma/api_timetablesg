const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubjectSchema = new Schema({
    year: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    isLab: {
        type: Boolean,
        required: true
    },
    faculty: [
        {
            type: Schema.Types.ObjectId,
            ref: 'myFaculty'
        }
    ]
})

module.exports = Subject = mongoose.model('mySubject', SubjectSchema)