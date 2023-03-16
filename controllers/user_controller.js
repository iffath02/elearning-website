const bcrypt = require("bcrypt")
const express = require("express")
const router = express.Router()
const pool = require("./../db")

router.get("/signup", (req, res) => {
  res.render("signup")
})

/* warning - will create multiple users with the same email */
router.post("/", (req, res) => {
  const { name, email, password, passwordConfirmation, isAdmin } = req.body

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, digestedPassword) => {
      const sql = `
        insert into users (name, email, password, isAdmin)
        values ($1, $2, $3, $4) returning user_id;
      `

      pool.query(sql, [name, email, digestedPassword, isAdmin], (err, dbRes) => {
        if (err) {
          console.err(err)
          res.render("signup")
        } else {
          req.session.userId = dbRes.rows[0].id
          res.redirect("/")
        }
      })
    })
  })
})

router.post('/:course_id', (req, res) => {
  const course_id = req.params.course_id
  const user_id = req.body.user_id
  const sql = `Select * from user_courses where user_id=${user_id} and course_id=${course_id}`
  pool.query(sql, (err, dbRes) => {
    console.log(err)
    if(dbRes.rows.length == 0){
      const sql = 'insert into user_courses (user_id, course_id) values ($1, $2);'

      pool.query(sql, [user_id, course_id], (err1, dbRes1) => {
        res.redirect(`/users/courses/${user_id}`)
      })
    }
    else{
    res.redirect(`/users/courses/${user_id}`)
    }
  })
})

router.get('/courses/:user_id', (req,res) => {
  const user_id = req.params.user_id
  const sql = 'select * from user_courses JOIN courses on user_courses.course_id=courses.course_id where user_courses.user_id=$1;'
  
  pool.query(sql, [user_id], (err, dbRes) => {
    const records = dbRes.rows
        res.render("user_courses", {records: records})
      })
    });

module.exports = router