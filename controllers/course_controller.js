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
    //console.log(course_category)
    const sql = `select * from courses where category like '${course_category}%' ;`
    pool.query(sql, (req, dbRes) => {
        const category_records = dbRes.rows
        //console.log(category_records)
        res.render('course_category', {category_records: category_records})
    })
})

router.get('/courses/new', (req,res) => {
    const sql = `select * from courses;`

    pool.query(sql, (err, dbRes) => {
        const lastRecord = dbRes.rows[dbRes.rows.length - 1]
        //console.log(lastRecord)
        const counter = ++lastRecord.course_id
        //console.log(counter)
        res.render("new_course", {counter: counter})
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

router.post('/courses', (req,res) => {
    const course_id = req.body.course_id
    const category = req.body.category
    const course_name = req.body.course_name
    const sql = 'insert into courses (course_id, category, course_name) values ($1, $2, $3)'

    pool.query(sql, [course_id, category, course_name], (err, dbRes) => {
        res.render("new_course_details", {course_id: course_id, category: category, course_name: course_name})
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

router.get('/courses/:course_id/edit', (req, res) => {
    const sql = 'Select * from course where course_id = $1'
    pool.query(sql, [req.params.course_id], (err,dbRes) => {
        //console.log(err)
        //console.log(dbRes.rows[0], '77')
        const course = dbRes.rows[0]
        res.render('edit_course', {course: course})
    })
})

router.put('/courses/:course_id', (req, res) => {
    const sql = 'update course set category = $1, course_id = $2, course_name = $3, image_url = $4, blurb = $5, curriculum = $6, skills_covered = $7 where course_id = $8;'

    pool.query(sql, [req.body.category, req.body.course_id, req.body.course_name, req.body.image_url, req.body.blurb, req.body.curriculum, req.body.skills_covered, req.body.course_id], (err, dbRes) => {
        res.redirect(`/courses/${req.body.course_id}`)
    })
})

router.delete('/courses/:course_id', (req, res) => {
    const course_id = req.body.course_id
    console.log(course_id)
    const sql = `delete from courses where course_id = ${course_id};`

    pool.query(sql, (err1, dbRes1) => {
        const sql = `delete from course where course_id = ${course_id}`
        pool.query(sql, (err2, dbRes2) => {
        //         const sql = `select * from user_courses where course_id = ${course_id})`
        //         pool.query(sql, (err3, dbRes3) => {
        //             console.log(err3)
        //             console.log(dbRes3.rows)
        //             if(dbRes4.rows.length == 0){
        //                 res.redirect('/')
        //             }
        //             else{
        //                 const sql = `delete from user_courses where course_id = ${course_id}`
        //                 pool.query(sql, (err2, resDb) => {
        //                     res.redirect('/')
        //                 })
        //             }
        //         })
        //     })
        res.redirect('/')
        })
    })
})



module.exports = router