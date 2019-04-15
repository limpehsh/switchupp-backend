const mongoose = require('mongoose');

const crate = require('mongoose-crate')
const LocalFS = require('mongoose-crate-localfs')
const GraphicsMagic = require('mongoose-crate-gm')

const UserModel = require('../models/User.js');

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    title: {type: String, required: true},
    locname: {type: String, required: true },
    lat: {type: Number, required: true},
    lon: {type: Number, required: true},
    desc: {type: String, required: true },
    author: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    votescore: {type: Number, required: true},
    voteuserAll: [mongoose.Schema.Types.Mixed],
    voteuserUp: [mongoose.Schema.Types.Mixed],
    voteuserDown: [mongoose.Schema.Types.Mixed],
    createdAt: {type: Date, required: true},
    visible: {type: Boolean, required: true}
    //user: {type: UserSchema, required: false}

});
/*
ReportSchema.plugin(crate, {
  storage: new LocalFS({
    directory: '/public/u'
  }),
  fields: {
    image: {
      processor: new GraphicsMagic({
        tmpDir: '/tmp', // Where transformed files are placed before storage, defaults to os.tmpdir()
        formats: ['JPEG', 'GIF', 'PNG'], // Supported formats, defaults to ['JPEG', 'GIF', 'PNG', 'TIFF']
        transforms: {
          original: {
            // keep the original file
          },
          small: {
            resize: '150x150',
            format: '.jpg'
          },
          medium: {
            resize: '250x250',
            format: '.jpg'
          }
        }
      })
    }
  }
})
*/
const ReportModel = mongoose.model('Report', ReportSchema);

ReportSchema.index({ title: 1 }, { unique: false });

ReportModel.findReportById = (ReportId, callback) => {
    ReportModel.findById(ReportId, (err, data) => {
        if (err) return callback(err)
        return callback(null, data)
    })
}

// Fetch Newest Reports
ReportModel.getNewest = (nothing, callback) => {
    console.log("There has been a request for newest posts")
    ReportModel.find({}, {}, { sort: { 'createdAt' : -1 } }, (err, reports) => {
        if (err) return callback(err);
        return callback(null, reports);
    })
    /*ReportModel.findOne().sort({created_at: -1}) => (err, report) {
        if (err) return callback(err);
        return callback(null, report);
    });*/
}

// Fetch Most Voted Reports
ReportModel.getMostVoted = (nothing, callback) => {
    console.log("There has been a request for most voted posts")
    ReportModel.find({}, {}, { sort: { 'votescore' : -1 } }, (err, reports) => {
        if (err) return callback(err);
        return callback(null, reports);
    })
}

// Fetch reports via a user on the site, most recent as well
ReportModel.getReportsByUser = (author, callback) => {
  console.log("Request to find posts by " + author)
  ReportModel.find({ 'author' : author }, {}, { sort: { 'createdAt' : -1 } }, (err, reports) => {
      if (err) return callback(err);
      return callback(null, reports);
  })
}

// Fetch reports via categirues on the site, most recent as well
ReportModel.getReportsByCategory = (category, callback) => {
  console.log("Request to find posts in " + category)
  ReportModel.find({ 'category' : category }, {}, { sort: { 'createdAt' : -1 } }, (err, reports) => {
      if (err) return callback(err);
      return callback(null, reports);
  })
}

ReportModel.createReport = (ReportData, callback) => {
    const newReport = new ReportModel(ReportData)
    newReport.save((err, data) => {
        if(err) return callback(err)
        return callback(null, data)
    })
}

ReportModel.deleteReport = (ReportId, callback) => {
    ReportModel.find( { id:ReportId } ).remove();
    return callback(null, null);
}

ReportModel.updateReportVotes = (ReportId, updateObj, callback) => {
    ReportModel.findByIdAndUpdate(ReportId, updateObj, {new: true}, (err, reports) => {
      if (err) return callback(err);
      return callback(null, reports);
    })
}

module.exports = ReportModel;
