function checkLogin(req, res, next){
    if(!req.user) return res.status(401).send('Please login')
    next()
}

export default checkLogin