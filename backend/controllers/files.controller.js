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
        .resize({ height: parseInt(resolution)*2 })
        .webp({ quality: parseInt(quality) })
        .toFile(`uploads/${name}.webp`,async (err, ) => {
            if (err) res.status(400).send({ alert: err.message });
          if (blur === "true"){
             const resizedImageBuf = await sharp(file.data)
              .resize({ height: 50 })
              .blur(1.25)
              .webp({ quality: 90 })
              .toBuffer();
                res.status(200).send({ alert: "Compressed", blur:`data:image/webp;base64,${resizedImageBuf.toString('base64')}` });
          }
            else res.status(200).send({ alert: "Compressed" });
        });
    }
  } catch (error) {
    res.status(500).send({ alert: error.message });
  }
};
