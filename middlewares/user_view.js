function userView(req, res, next){
    res.locals.isAdmin = () => {
        if (!req.session.isAdmin){
            return true
        } else{
            return false
        }
    }
    next()
}

module.exports = userView