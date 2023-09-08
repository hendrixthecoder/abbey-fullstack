const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

TransactionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = Transaction