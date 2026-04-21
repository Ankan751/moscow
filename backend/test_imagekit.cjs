const ImageKit = require("imagekit");
const fs = require("fs");
require("dotenv").config();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function test() {
    try {
        const fileContent = fs.readFileSync("../frontend/src/assets/a7676918e1dc434feaadab5681b847444351d062.png");
        const result = await imagekit.upload({
            file: fileContent,
            fileName: "test.png",
            folder: "Property"
        });
        console.log("Success", result);
    } catch(err) {
        console.error("Failed", err);
    }
}
test();
