const express = require('express')
const router = express.Router()

const Report = require('../models/Report');


router.get('/id/:ReportId', (req, res) => {
    const ReportId = req.params.ReportId;
    Report.findReportById(ReportId, (err, _Report) => {
        if (!_Report) return res.status(400).send("There's no Report here.");
        return res.send(_Report);
    })
})

router.get('/newest/', (req, res) => {
    console.log("fetching newest posts")
    Report.getNewest(true, (err, _Report) => {
        if (!_Report) return res.status(400).send("There are no reports here.");
        return res.send(_Report);
    })
})

router.get('/most-voted/', (req, res) => {
    console.log("fetching most voted posts")
    Report.getMostVoted(true, (err, _Report) => {
        if (!_Report) return res.status(400).send("There are no reports here.");
        return res.send(_Report);
    })
})

router.get('/category/:cateGory', (req, res) => {
    const cateGory = req.params.cateGory;
    Report.getReportsByCategory(cateGory, (err, _Report) => {
        if (!_Report) return res.status(400).send("There are no reports here.");
        return res.send(_Report);
    })
})

router.get('/username/:userName', (req, res) => {
    const userName = req.params.userName;
    Report.getReportsByUser(userName, (err, _Report) => {
        if (!_Report) return res.status(400).send("There are no reports here.");
        return res.send(_Report);
    })
})

router.post('/', (req, res) => {
    const report = req.body
    report.createdAt = new Date();
    Report.createReport(report, (err, data) => {
        if (err) return res.status(400).send(err)
        return res.send(data)
    })
})



router.delete('/:ReportId', (req, res) => {
    const ReportId = req.params.ReportId;
    Report.deleteReport(ReportId, (err, _Report) => {
        if (!_Report) return res.status(400).send("There's no report here.");
        return res.send(_Report);
    })
})

router.put('/:ReportId', (req, res) => {
    const ReportId = req.params.ReportId;
    Report.updateReportVotes(ReportId, {$set: req.body}, (err, data) => {
        if (err) return res.status(400).send(err)
        return res.send(data)
    })
})



module.exports = router;
