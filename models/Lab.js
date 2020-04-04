const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LabSchema = new Schema({
    roomNo: {
        type: String,
        required: true,
    },
    schedule: {
        mon: {
            mng: {
                type: Schema.Types.ObjectId,
                ref: 'myClass'
            },
            evng: {
                type: Schema.Types.ObjectId,
                ref: 'myClass'
            }
        },
        tue: {
            mng: {
                type: Schema.Types.ObjectId,
                ref: 'myClass'
            },
            evng: {
                type: Schema.Types.ObjectId,
                ref: 'myClass'
            }
        },
        wed: {
            mng: {
                type: Schema.Types.ObjectId,
                ref: 'myClass'
            },
            evng: {
                type: Schema.Types.ObjectId,
                ref: 'myClass'
            }
        },
        thu: {
            mng: {
                type: Schema.Types.ObjectId,
                ref: 'myClass'
            },
            evng: {
                type: Schema.Types.ObjectId,
                ref: 'myClass'
            }
        },
        fri: {
            mng: {
                type: Schema.Types.ObjectId,
                ref: 'myClass'
            },
            evng: {
                type: Schema.Types.ObjectId,
                ref: 'myClass'
            }
        },
        sat: {
            mng: {
                type: Schema.Types.ObjectId,
                ref: 'myClass'
            },
            evng: {
                type: Schema.Types.ObjectId,
                ref: 'myClass'
            }
        },
    }
})


module.exports = Lab = mongoose.model('myLab', LabSchema)
