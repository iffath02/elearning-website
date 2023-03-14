const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('./../middlewares/ensure_logged_in')
const pool = require('./../db')

router.get('/', (req, res) => {
    const sql = 'select * from courses;'
    pool.query(sql, (err, dbRes) => {
        const records = dbRes.rows
        res.render("home", {records: records})
    })
})

router.get('/courses/:course_id', ensureLoggedIn, (req, res) => {
    let course_id = req.params.course_id
    const sql = 'select * from course where course_id=$1;'
    pool.query(sql, [course_id], (err, dbRes) => {
        const record = dbRes.rows[0]
        res.render('course_details', {course: record})
    })
})

module.exports = router