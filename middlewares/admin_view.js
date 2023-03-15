function adminView(req, res, next){
    res.locals.isAdmin = () => {
        if (req.session.isAdmin === 'true'){
            return true
        } else{
            return false
        }
    }
    next()
}

module.exports = adminView