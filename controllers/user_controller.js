const bcrypt = require("bcrypt")
const express = require("express")
const router = express.Router()
const pool = require("./../db")

router.get("/signup", (req, res) => {
  res.render("signup")
})

/* warning - will create multiple users with the same email */
router.post("/", (req, res) => {
  const { name, email, password, passwordConfirmation } = req.body

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, digestedPassword) => {
      const sql = `
        insert into users (name, email, password)
        values ($1, $2, $3) returning user_id;
      `

      pool.query(sql, [name, email, digestedPassword], (err, dbRes) => {
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