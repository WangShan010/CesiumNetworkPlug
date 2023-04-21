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

viewer.scene.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(-122.3472, 47.598, 370),
    orientation: {
        heading: Cesium.Math.toRadians(10),
        pitch: Cesium.Math.toRadians(-10)
    }
});

setTimeout(() => {
    let tileSet = Cesium.createOsmBuildings();
    viewer.scene.primitives.add(tileSet);
}, 3000);
