import Jimp from "jimp";
var fs = require("fs");

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      return handleImage();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function handleImage() {
    const file = req.body;
    console.log(req);
    try {
      const image = await Jimp.read(file);
      await image.resize(1920, 1080);
      await image.quality(85);
      await image.getBase64(Jimp.AUTO, function (err, data) {
        res.status(200).send(data);
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({ alert: error });
    }
  }
}
