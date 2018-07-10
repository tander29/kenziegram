const express = require("express");
const multer = require("multer");
const fs = require("fs");

const publicPath = "public/";
const port = 3000;
const app = express();
const uploadPath = './public/uploads';
const upload = multer({ dest: uploadPath });
const uploadedPictures = []

app.use(express.static(publicPath));

app.post('/public/upload', upload.single('myPhoto'), (request, response, next) => {
    // console.log(`Uploaded ${request.file.filename}`)
    // uploadedPictures.push(request.file.filename)

    fs.readdir(uploadPath, (err, items) => {
        // console.log(items);
        response.send(`<h1>Successful upload</h1>`)
    })

})

app.get("/", (req, res) => {
    let photoArray = []
    fs.readdir(uploadPath, (err, items) => {
        console.log(items);

        items.forEach(item => photoArray.push(`<img src=http://localhost:3000/uploads/${item}>`))
        console.log(photoArray)
        res.send(
            `<body>
            <h1>Welcome to Kenzie Gram! This page is for uploads, go to the main page to upload a photo</h1>

            <form action="/public/upload" enctype="multipart/form-data" method="POST">
            <fieldset>
            <legend>Me</legend>
                <label for="myPhoto">Real quick, is this grammable?</label>
                <input type="file" name="myPhoto" id="myPhoto">
            <input type="submit">
            </fieldset>

    </form>   

            ${photoArray}
            </body>`
        )


    })

})






app.listen(port, () => console.log("hi dad"))