const sharp = require("sharp");
const path = require("path");

exports.create = async (req, res) => {
  try {
    if (!req.files) {
      res.status(404).send({
        alert: "No file uploaded",
      });
    } else {
      let file = req.files.file;
      let name = path.parse(file.name).name;
      sharp(file.data)
        .resize({ height: parseInt(req.body.resolution) })
        .webp({ quality: parseInt(req.body.quality) })
        .toFile(`uploads/${name}.webp`, (err, data) => {
          if (req.body.blur === "true")
            sharp(file.data)
              .resize({ height: parseInt(req.body.resolution) * 0.1 })
              .webp({ quality: 10 })
              .toFile(`uploads/blur/${name}.webp`, (err, data) => {
                if (err) res.status(200).send({ alert: err });
                else res.status(200).send({ alert: "Compressed" });
              });
          else {
            if (err) res.status(200).send({ alert: err });
            else res.status(200).send({ alert: "Compressed" });
          }
        });
    }
  } catch (error) {
    res.status(400).send({ alert: error });
  }
};
