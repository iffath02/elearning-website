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

module.exports = router