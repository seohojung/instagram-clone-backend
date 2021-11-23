import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

// In case file upload does not work due to the version of GraphQLUpload
// (Warning: [DEP0135] DeprecationWarning: ReadStream.prototype.open() is deprecated)
// Go to package.json, set the version of "resolutions": {"fs-capacitor": "3.0.0"}
// Run npm install
export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "jungbrosdev-instagram-clone-uploads",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  return Location;
};
