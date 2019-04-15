const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true }
    author: {type: String, required: true },
    dateCreated: {type: Date, required: true};
});

const ReportModel = mongoose.model('Comment', CommentSchema);

CommentSchema.index({ title: 1 }, { unique: false });

CommentModel.findCommentById = (CommentId, callback) => {
    CommentModel.findById(CommentId, (err, data) => {
        if (err) return callback(err)
        return callback(null, data)
    })
}


CommentModel.createComment = (CommentData, callback) => {
    const newReport = new ReportModel(CommentData)
    newReport.save((err, data) => {
        if(err) return callback(err)
        return callback(null, data)
    })
}

CommentModel.deleteComment = (CommentId, callback) => {
    CommentModel.find( { id:ReportId } ).remove();
    return callback(null, null);
}

module.exports = CommentModel;
