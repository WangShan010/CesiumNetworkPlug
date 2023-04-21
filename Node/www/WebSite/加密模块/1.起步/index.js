const CryptoUtil = CesiumNetworkPlug.DecryptionController.CryptoUtil;

// const host = "http://localhost:5000/encryptData";
const host = "http://101.43.223.126:5000/encryptData";


const img = document.getElementById("img");
const textDom = document.getElementById("txtDom");
const time = document.getElementById("time");

window.clearData = function () {
    img.src = "";
    textDom.innerText = "";
};

window.loadText = async function () {
    clearData();
    let [err, blob] = await CryptoUtil.decryptFirstFileByUrl(`${host}/other/Hi.txt`, "@mtJQGyEEq6DBK.hxVR*3fTGgXssxCfMtZQEyUTF", true);
    let [turnErr, text] = await CryptoUtil.blobToText(blob);
    document.getElementById("txtDom").innerHTML = text;
};

window.loadJson = async function () {
    clearData();
    let [err, blob] = await CryptoUtil.decryptFirstFileByUrl(`${host}/other/浙江省.geojson`, "@mtJQGyEEq6DBK.hxVR*3fTGgXssxCfMtZQEyUTF", true);
    let [turnErr, json] = await CryptoUtil.blobToJson(blob);
    document.getElementById("txtDom").innerHTML = JSON.stringify(json, null, 2);
};

window.loadJpg = async function () {
    clearData();
    // 方案一
    // let [err, blob] = await CryptoUtil.decryptFirstFileByUrl(`${host}/other/worldImage.jpg`, "@mtJQGyEEq6DBK.hxVR*3fTGgXssxCfMtZQEyUTF", true);
    // let img = document.getElementById("img");
    // img.src = window.URL.createObjectURL(blob);

    // 方案二
    let {data: encryptBlob} = await axios.get(`${host}/other/worldImage.jpg`, {responseType: "blob"});
    let [err2, blob] = await CryptoUtil.decryptFirstFileBlob(encryptBlob, "@mtJQGyEEq6DBK.hxVR*3fTGgXssxCfMtZQEyUTF", true);
    let arrayBuffer = await blob.arrayBuffer();
    let img = document.getElementById("img");
    img.src = window.URL.createObjectURL(blob);
    console.log(encryptBlob, blob, arrayBuffer);
};


setInterval(() => {
    time.innerHTML = new Date().getTime();

    if (textDom.innerHTML) {
        textDom.style.display = "inline-block";
    } else {
        textDom.style.display = "none";
    }
}, 50);