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
    authorID: {
        type: Schema.Types.ObjectId,
        ref: '',
        required: false
    }
});
//mongoose will make the name of the collection Notes (pluralizes the model)
const NoteModel = mongoose.model('Note', noteSchema);

module.exports = NoteModel