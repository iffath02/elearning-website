const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const pool = require('./../db')

router.get('/login', (req, res) => {
    //console.log(req.session)
    res.render('login')
})

router.post('/sessions', (req,res) => {

    const email = req.body.email
    const password = req.body.password
    console.log(email, password)

    const sql = `Select * from users where email=$1;`
    pool.query(sql, [email], (err, dbRes) => {
        if(dbRes.rows.length === 0){
            res.render('signup')
        }

        const user = dbRes.rows[0]

        bcrypt.compare(password, user.password, (err, result) => {
            console.log(result)
            if(result){
                console.log(req.session)
                req.session.userId = user.user_id 
                req.session.email = user.email
                req.session.isAdmin = user.isadmin
                console.log(req.session.isAdmin)

                res.redirect('/')
            } else{
                console.log(err)
                res.render('login')
            }
        })
    
    })
})

router.delete('/sessions', (req,res) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
})

module.exports = router