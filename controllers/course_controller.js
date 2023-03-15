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

router.get('/courses/new', (req,res) => {
    res.render("new_course")
})

router.get('/courses/:course_id', (req, res) => {
    let course_id = req.params.course_id
    const sql = 'select * from course where course_id=$1;'
    pool.query(sql, [course_id], (err, dbRes) => {
        const record = dbRes.rows[0]
        res.render('course_details', {course: record})
    })
})

router.post('/courses', (req,res) => {
    const course_id = req.body.course_id
    const category = req.body.category
    const course_name = req.body.course_name
    const sql = 'insert into courses (course_id, category, course_name) values ($1, $2, $3)'

    pool.query(sql, [course_id, category, course_name], (err, dbRes) => {
        res.render("new_course_details", {course_id: course_id})
    })
})

router.post('/courses/new/course/:course_id', (req, res) => {
    const category = req.body.category
    const course_id = req.body.course_id
    const course_name = req.body.course_name
    const image_url = req.body.image_url
    const blurb = req.body.blurb
    const curriculum = req.body.curriculum
    const skills_covered = req.body.skills_covered
    const sql = 'insert into course (category, course_id, course_name, image_url, blurb, curriculum, skills_covered) values ($1, $2, $3, $4, $5, $6, $7)'

    pool.query(sql, [category, course_id, course_name, image_url, blurb, curriculum, skills_covered], (err, dbRes) => {
        res.redirect('/')
    })
})



module.exports = router