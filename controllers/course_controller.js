const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('./../middlewares/ensure_logged_in')
const pool = require('./../db')

router.get('/', (req, res) => {
    const sql = 'select * from courses;'
    pool.query(sql, (err, dbRes) => {
        res.locals.records = {}
        res.locals.records = dbRes.rows
        res.render("home", {records: res.locals.records})
    })
})

router.get('/courses/category/:course_category', (req, res) => {
    let course_category = req.params.course_category
    console.log(course_category)
    const sql = `select * from courses where category like '${course_category}%' ;`
    pool.query(sql, (req, dbRes) => {
        const category_records = dbRes.rows
        console.log(category_records)
        res.render('course_category', {category_records: category_records})
    })
})

router.get('/courses/:course_id', (req, res) => {
    let course_id = req.params.course_id
    const sql = 'select * from course where course_id=$1;'
    pool.query(sql, [course_id], (err, dbRes) => {
        const record = dbRes.rows[0]
        res.render('course_details', {course: record})
    })
})

router.get('/')

module.exports = router