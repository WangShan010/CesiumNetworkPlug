let OfflineCache = CesiumNetworkPlug.OfflineCacheController;
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NjYwM2E1NS00OTRlLTRiMjEtYjhhZS05MzEzNDIwNGUzMjgiLCJpZCI6MjM5OTcsImlhdCI6MTY3OTI3ODE4OX0.X_5SfpOtpL-gSbGjAP2Z6ohp1jmI5k_UtjzA72iFPcQ';


OfflineCacheController.ruleList.add(`https://assets.ion.cesium.com/ap-northeast-1/asset_depot/1/CesiumWorldTerrain/`);
OfflineCacheController.ruleList.add(`http://ecn.t0.tiles.virtualearth.net/tiles/`);
OfflineCacheController.ruleList.add(`http://ecn.t1.tiles.virtualearth.net/tiles/`);
OfflineCacheController.ruleList.add(`http://ecn.t2.tiles.virtualearth.net/tiles/`);
OfflineCacheController.ruleList.add(`http://ecn.t3.tiles.virtualearth.net/tiles/`);

let viewer = new Cesium.Viewer("MapContainer", {
    timeline: false,
    animation: false,
    terrain: Cesium.Terrain.fromWorldTerrain(),
});

viewer.scene.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(-122.3472, 47.598, 370),
    orientation: {
        heading: Cesium.Math.toRadians(10),
        pitch: Cesium.Math.toRadians(-10)
    }
});

