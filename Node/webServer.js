const Koa = require("koa");
const cors = require("koa2-cors");
const compress = require("koa-compress");
const router = require("koa-router")();
const koaStatic = require("koa-static");
const path = require("path");
const fs = require("fs");
const CryptoUtil = require("./www/CesiumNetworkPlug/dist/CryptoUtil.min.js");


let server = new Koa();
let password = "@mtJQGyEEq6DBK.hxVR*3fTGgXssxCfMtZQEyUTF";

// 判断是否处于开发环境
let isDev = !__dirname.includes("snapshot");
let appBasePath = "";
if (isDev) {
    appBasePath = path.join(__dirname, "./");
} else {
    appBasePath = path.dirname(process.execPath);
}

router.all("/encryptData/:path(.*)", async function (ctx, next) {
    let urlPath = ctx.params.path;
    let fileName = path.basename(urlPath);
    try {
        const buffer = fs.readFileSync(path.join(appBasePath, `./www/${urlPath}`));
        const blob = new Blob([buffer]);

        const [encryptErr, encryptBlob] = await CryptoUtil.encryptByBlob(blob, password, `${fileName}`, false);

        ctx.response.set("Content-Type", "application/crypto-blob");
        ctx.body = encryptErr || Buffer.from(await encryptBlob.arrayBuffer());
    } catch (err) {
        ctx.body = err.toString();
    }
});

server.listen(5000, function () {
    // 允许跨域
    server.use(cors());
    // 进行 Gzip 压缩
    server.use(compress({br: false}));
    // 挂挂载静态网站
    server.use(koaStatic(path.join(appBasePath, "./www/"), {defer: true}));
    // 添加路由
    server.use(router.routes());

    console.log("WebServer is running at http://localhost:5000");
});
