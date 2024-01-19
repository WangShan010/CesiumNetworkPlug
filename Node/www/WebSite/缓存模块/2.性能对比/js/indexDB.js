let OfflineCache = CesiumNetworkPlug.OfflineCacheController;

OfflineCache.ruleList.add("*");

let viewer = new Cesium.Viewer("MapContainer", {
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: "https://c.tile.thunderforest.com/transport/{z}/{x}/{y}.png",
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
        maximumLevel: 19
    }),
    timeline: false,
    animation: false
});


setTimeout(() => {
    // const tileSet = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    //     url: "http://xxx.xx.xxx.xxx:3000/Resources/3DTiles/tileset.json",
    //     maximumScreenSpaceError: 1
    // }));
    //
    // viewer.flyTo(tileSet).then();


    // Cesium 1.107 后添加倾斜模型的方式不同了
    Cesium.Cesium3DTileset.fromUrl(
        'http://101.43.223.126:5000/GISData/3DTiles-DaYanTa/tileset.json',
        {maximumScreenSpaceError: 1}
    ).then((tileSet) => {
        viewer.scene.primitives.add(tileSet);
        viewer.flyTo(tileSet).then();
    });
}, 3000);


