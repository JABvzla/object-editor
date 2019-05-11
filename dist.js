const fs = require("fs");
const VERSION = process.env.VERSION ? process.env.VERSION : "alpha.0.0.0";
const FILE_PATH = `dist/object-editor.${VERSION}.min.js`;
const BUILD_DIR = "build/static/js/";

console.log("Generating version:", VERSION);

generateFile(FILE_PATH)(eachFile(BUILD_DIR)(appendDist));

function generateFile(path) {
  fs.open(path, "wx", err => {
    if (err) {
      if (err.code === "EEXIST")
        return fs.unlink(path, () => generateFile(path));
      throw err;
    }
  });
  return fn => fn.apply();
}

function eachFile(dir) {
  return callback => () => {
    fs.readdir(dir, (err, files) => {
      if (err) throw err;

      files.forEach(file => callback(dir + file));
    });
  };
}

function appendDist(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) throw err;

    fs.appendFile(FILE_PATH, "\r\n" + data, err => {
      if (err) throw err;
    });
  });
}
