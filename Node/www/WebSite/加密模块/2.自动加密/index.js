// const host = "http://localhost:5000/encryptData";
const host = "http://101.43.223.126:5000/encryptData";

CesiumNetworkPlug.OfflineCacheController.ruleList.add(`${host}`);
CesiumNetworkPlug.DecryptionController.ruleMap.set(`${host}`, "@mtJQGyEEq6DBK.hxVR*3fTGgXssxCfMtZQEyUTF");

window.viewer = new Cesium.Viewer("MapContainer", {
    timeline: false,
    animation: false,
    // 加载本地影像
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: `${host}/GISData/MapBox-Tile/{z}/{x}/{y}.jpeg`,
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
        maximumLevel: 5
    }),
    // 加载本地地形
    terrainProvider: new Cesium.CesiumTerrainProvider({
        url: `${host}/GISData/assets.cesium.com/1`,
        requestVertexNormals: false,
        requestWaterMask: false,
        credit: void 0
    })
});


// 加载本地大雁塔 3DTiles 模型
viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    position: Cesium.Cartesian3.fromDegrees(120, 30, 500),
    url: `${host}/GISData/3DTiles-DaYanTa/tileset.json`
}))
    .readyPromise.then(function (tileSet) {

    // 开启深度检测
    viewer.scene.globe.depthTestAgainstTerrain = true;

    // 计算 tileSet 的绑定范围
    let boundingSphere = tileSet.boundingSphere;

    // 计算中心点位置
    let cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);

    // 计算中心点位置的地表坐标
    let surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);

    // 偏移后的高度
    let heightOffset = 2010;
    let offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);

    // tileSet.modelMatrix 转换
    let translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());


    tileSet.modelMatrix = Cesium.Matrix4.fromTranslation(translation);

    viewer.flyTo(tileSet);
});
