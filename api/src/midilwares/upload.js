const multer = require('multer');
const path = require('path');

module.exports = multer({
    storage: multer.diskStorage({
        destination: './upload/',
        filename: function (req, file, retuncallback) {
           
            const userId = req.user ? req.user.id : 'anonymous';
            const originalName = file.originalname 
            let newFileName =`${userId}-${originalName}` 
            
            // req.filePath = path.join('upload', newFileName);
            retuncallback(null, newFileName);
        }
    })
});

// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: './upload/',
//     filename: function (req, file, retuncallback) {
//         const userId = req.user ? req.user.id : 'anonymous';
//         const originalName = file.originalname;
//         const newFileName = `${userId}-${Date.now()}-${originalName}`; // Daha benzersiz yapmak için zaman damgası ekliyoruz
//         req.filePath = path.join('upload', newFileName); // Dosya yolunu req nesnesine ekliyoruz
//         retuncallback(null, newFileName);
//     }
// });

// const upload = multer({ storage: storage });

// module.exports = upload;