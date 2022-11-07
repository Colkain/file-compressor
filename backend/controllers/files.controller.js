const sharp = require("sharp");
const path = require("path");

exports.create = async (req, res) => {
  try {
    if (!req.files) {
      res.status(404).send({
        alert: "No file uploaded",
      });
    } else {
      const { resolution, quality, blur } = req.body;
      let { file } = req.files;
      let name = path.parse(file.name).name;
      sharp(file.data)
        .resize({ height: parseInt(resolution) })
        .webp({ quality: parseInt(quality) })
        .toFile(`uploads/${name}.webp`, (err, data) => {
          if (blur)
            sharp(file.data)
              .resize({ height: parseInt(resolution) * 0.1 })
              .webp({ quality: 10 })
              .toFile(`uploads/blur/${name}.webp`, (err, data) => {
                if (err) res.status(400).send({ alert: err.message });
                else res.status(200).send({ alert: "Compressed" });
              });
          else {
            if (err) res.status(400).send({ alert: err.message });
            else res.status(200).send({ alert: "Compressed" });
          }
        });
    }
  } catch (error) {
    res.status(500).send({ alert: error.message });
  }
};
