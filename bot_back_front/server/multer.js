import multer from 'multer';

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'), false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;