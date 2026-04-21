import imagekit from "./config/imagekit.js";
import fs from "fs";
import path from "path";

async function test() {
    try {
        console.log("Testing imagekit...");
        const result = await imagekit.upload({
            file: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
            fileName: "test.png",
        });
        console.log("Success:", result.url);
    } catch (e) {
        console.error("Error:", e);
    }
}
test();
