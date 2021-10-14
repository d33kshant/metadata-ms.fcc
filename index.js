const express = require('express')
const multer = require('multer')

const app = express()
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
})
const upload = multer({ storage })

const PORT = 5000

app.use(express.json())

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  const file = req.file
  res.json({
    name: file.filename,
    type: file.mimetype,
    size: file.size
  })
})

app.listen(PORT, ()=>console.log('Server started listening on port:', PORT))
