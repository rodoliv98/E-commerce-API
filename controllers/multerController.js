export const multerController = (req, res, next) => {
    if(!req.file) return res.status(400).send('No image sent')
    const imagePath = `/images/${req.file.filename}`;
    res.status(200).send(`Success, image path: ${imagePath}`);
}