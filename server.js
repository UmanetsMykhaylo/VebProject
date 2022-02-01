const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');
const cors = require('cors');
const fs = require('fs');

app.use('/form', express.static(path.join(__dirname, '/index.html')));
app.use('/js', express.static(path.join(__dirname, '/src')));
app.use('/files', express.static(path.join(__dirname, '/uploads')));
app.use('/lib', express.static(path.join(__dirname, '/lib')));
app.use('/styles', express.static(path.join(__dirname, '/style.css')));

// default options
app.use(cors());
app.use(fileUpload());

app.get('/list', function(req, res) {
  const files = fs.readdirSync('./uploads');
  const response = [];
  const result = files.filter(dirEntry => !dirEntry.includes('.gitignore'));

  for (const file of result) {
    const extension = path.extname(file);
    const fileSizeInBytes = fs.statSync(`./uploads/${file}`).size;
    response.push({ name: file, extension, fileSizeInBytes });
  }
  res.send(response);
});

app.delete('/list/:dirEntry', function(req, res) {
  const { dirEntry } = req.params;
  fs.unlink(`./uploads/${dirEntry}`, err => {
    if (err) {
      throw new Error();
    }
    res.send(dirEntry);
  });
});

app.post('/ping', function(req, res) {
  res.send('pong');
});

app.post('/upload', function(req, res) {
  let sampleFile = null;
  let uploadPath = null;

  if (Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  sampleFile = req.files.sampleFile; // eslint-disable-line

  uploadPath = path.join(__dirname, '/uploads/', sampleFile.name);

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send(path.join('File uploaded to ', uploadPath));
  });
});

app.listen(8000, function() {
  console.log('Express server listening on port 8000'); // eslint-disable-line
});
