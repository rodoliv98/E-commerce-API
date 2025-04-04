import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage }).single("image");

export const uploadMiddleware = (req, res, next) => {
    upload(req, res, (err) => {
        console.log(req.file.filename)
        if(err instanceof multer.MulterError){
            console.log(err)
            return res.status(500).json({ msg: err.message });
        } else if(err) {
            console.log(err)
            return res.status(500).json({ msg: err.message });
        }
        next();
    })
}