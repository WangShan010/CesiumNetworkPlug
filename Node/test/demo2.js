const fs = require("fs");
const path = require("path");
const {CryptoUtil} = require("../www/CesiumNetworkPlug/dist/CesiumNetworkPlug.min.js");

async function demo2() {
    const fileName = "浙江省.geojson";

    const buffer = fs.readFileSync(path.join(__dirname, "../www/other/" + fileName));
    const blob = new Blob([buffer]);

    console.time("加密时间");
    const [encryptErr, encryptBlob] = await CryptoUtil.encryptByBlob(blob,  "123456", fileName, false);
    const encryptBuffer = Buffer.from(await encryptBlob.arrayBuffer());
    console.timeEnd("加密时间");

    fs.writeFileSync(path.join(__dirname, fileName), encryptBuffer);
}


demo2();