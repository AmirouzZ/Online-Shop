

exports.isAuthenticated = (req, res, next) => {
    if(req.session.userId) {
        next();
    } else {
        res.redirect('/login')
    }
}

exports.isNotAuthenticated = (req, res, next) => {
    if(req.session.userId){
        res.redirect('/')
    } else {
        next();
    }
}