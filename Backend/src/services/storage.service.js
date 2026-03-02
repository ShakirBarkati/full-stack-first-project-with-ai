require("dotenv").config();
const { ImageKit, toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL_END_POINT,
});

const uploadFile = async (file, fileName) => {
  try {
    const result = await client.files.upload({
      file: file.buffer.toString("base64"),
      fileName: `${fileName} - ${file.originalname}`,
      mimeType: file.mimetype,
    });

    return result;
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw error;
  }
};

module.exports = uploadFile;
