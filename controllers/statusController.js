export const status = async (req, res) => {
    if (req.session && req.session.passport && req.session.passport.user){
        return res.status(200).json(true)
    }
    return res.status(200).json(false)
}