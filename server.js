const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const logger= require('./middlewares/logger')
const methodOverride = require('./middlewares/method_override')
const session = require('express-session')
const pool = require('./db')
const viewHelpers = require('./middlewares/view_helpers')
const MemoryStore = require('memorystore')(session)


app.set("view engine", "ejs")

app.use(logger)

app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }))

app.use(methodOverride)

app.use(session({
    secret: process.env.SESSION_SECRET || "mistyrose",
    store: new MemoryStore({
        checkPeriod: 86400000 
      }),
    resave: false,
    saveUninitialized: true,
})
)

app.use((req, res, next) => {

    const { userId } = req.session

    if(userId){
        const sql = `select id, email from users where id = ${userId}`

        pool.query(sql, (err, dbRes) => {
            if(err){
                console.log(err)
            } else{
                res.locals.currentUser = dbRes.rows[0]
                next()
            }
        })
    }else{
        next()
    }
})

app.use(viewHelpers)


// app.use("/", require('./controllers/session_controller'))

app.use("/", require('./controllers/course_controller'))

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})
