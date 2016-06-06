declare var System: any;

esriSystem.register(
    [
        'esri/Map',
        'esri/views/MapView',
        'esri/views/SceneView',
        'esri/widgets/Search',
        'esri/tasks/Locator',
        'esri/PopupTemplate',
        'esri/Graphic',
        'esri/geometry/Point',
        'esri/symbols/SimpleMarkerSymbol',
        'esri/geometry/support/webMercatorUtils'
      
    ],

    function() {
        System.import('app').catch(function(err) { console.error(err); });
    },

    {
        outModuleName: 'esri-mods'
    });