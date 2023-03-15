const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const expressLayouts = require("express-ejs-layouts")
const logger= require('./middlewares/logger')
const methodOverride = require('./middlewares/method_override')
const session = require('express-session')
const pool = require('./db')
const viewHelpers = require('./middlewares/view_helpers')
const MemoryStore = require('memorystore')(session)
const setCurrentUser = require("./middlewares/set_current_user")
const isAdmin = require("./middlewares/admin_view.js")


app.set("view engine", "ejs")

app.use(logger)

app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }))

app.use(methodOverride)

app.use(expressLayouts)

app.use(session({
    secret: process.env.SESSION_SECRET || "mistyrose",
    store: new MemoryStore({
        checkPeriod: 86400000 
      }),
    resave: false,
    saveUninitialized: true,
})
)

app.use(setCurrentUser)
app.use(viewHelpers)
app.use(isAdmin)

app.use("/", require('./controllers/course_controller'))
app.use("/", require('./controllers/session_controller'))
app.use("/users", require("./controllers/user_controller"))

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})
