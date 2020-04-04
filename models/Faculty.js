const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FacultySchema = new Schema({
    employeeID:{
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
    subjectsDealing:[
        {
            type: Schema.Types.ObjectId,
            ref: "mySubject"
        }
    ],
    timeTable:{
        mon:{
            sessions:[
                {
                    type: Schema.Types.ObjectId,
                    ref: "myClass"  
                }
            ],
            dayHrs:{
                type: Number,
                default: 0
            }
        },
        tue:{
            sessions:[
                {
                    type: Schema.Types.ObjectId,
                    ref: "myClass"  
                }
            ],
            dayHrs:{
                type: Number,
                default: 0
            }
        },
        wed:{
            sessions:[
                {
                    type: Schema.Types.ObjectId,
                    ref: "myClass"  
                }
            ],
            dayHrs:{
                type: Number,
                default: 0
            }
        },
        thu:{
            sessions:[
                {
                    type: Schema.Types.ObjectId,
                    ref: "myClass"  
                }
            ],
            dayHrs:{
                type: Number,
                default: 0
            }
        },
        fri:{
            sessions:[
                {
                    type: Schema.Types.ObjectId,
                    ref: "myClass"  
                }
            ],
            dayHrs:{
                type: Number,
                default: 0
            }
        },
        sat:{
            sessions:[
                {
                    type: Schema.Types.ObjectId,
                    ref: "myClass"  
                }
            ],
            dayHrs:{
                type: Number,
                default: 0
            }
        },

        totalHrs:{
            type: Number,
            default: 0,
        }
    }
})

module.exports = Faculty = mongoose.model('myFaculty', FacultySchema)