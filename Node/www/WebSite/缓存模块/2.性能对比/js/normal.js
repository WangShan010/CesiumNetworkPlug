let viewer = new Cesium.Viewer('MapContainer', {
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: 'https://c.tile.thunderforest.com/transport/{z}/{x}/{y}.png',
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
        maximumLevel: 19
    }),
    timeline: false,
    animation: false
});


setTimeout(() => {
    const tileSet = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: 'http://xxx.xx.xxx.xxx:3000/Resources/3DTiles/tileset.json',
        maximumScreenSpaceError: 1
    }));

    viewer.flyTo(tileSet).then();
}, 3000);


