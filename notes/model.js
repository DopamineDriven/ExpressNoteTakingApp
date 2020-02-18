const mongoose = require("mongoose");
const Schema = mongoose.Schema

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    //object id field acts like a foreign key for user records
    authorID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
//mongoose will make the name of the collection Notes (pluralizes the model)
const NoteModel = mongoose.model('Note', noteSchema);

module.exports = NoteModel