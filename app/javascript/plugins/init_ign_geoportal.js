import * as GpSdk2D from "@ignf-geoportal/sdk-2d";

const Ol = GpSdk2D.olExtended;
let apiKey01 = "";
let apiKey02 = "";

const buildMapFromGeoportal = () => {
  var osmLyr = new Ol.layer.Tile({
      source: new Ol.source.OSM()
  });
  var map = new Ol.Map({
      target: 'map',
      layers: [
          osmLyr,
          new Ol.layer.GeoportalWMTS({
              layer: "GEOGRAPHICALGRIDSYSTEMS.MAPS",
          }),
          new Ol.layer.GeoportalWMTS({
              layer: "ORTHOIMAGERY.ORTHOPHOTOS",
              olParams: {
                  opacity: 0.7
              }
          })
      ],
      view: new Ol.View({
          center: [288074.8449901076, 6247982.515792289],
          zoom: 12
      }),
  });    
  var lsControl = new Ol.control.LayerSwitcher({
      layers : [{
          layer: osmLyr,
          config: {
              title: "OSM",
              description: "Couche OpenStreet Map",
          }
      }], 
      options : {
          collapsed: true
      }
  });
  var seControl = new Ol.control.SearchEngine({
      collapsed: false,
      displayAdvancedSearch: false
  });
  map.addControl(lsControl);
  map.addControl(seControl);
  var infoDiv = document.getElementById("mapinfo");
  infoDiv.innerHTML = "<p> SDK version " + GpSdk2D.sdkVersion + " (" + GpSdk2D.sdkDate + ")</p>";
}


const initGeoportal = () => {
  fetch('/init', { headers: { accept: "application/json" }})
      .then(response => response.json())
      .then((data) => {
      console.log(data);
      apiKey01 = data.ignApiKey01;
      apiKey02 = data.ignApiKey02;
      GpSdk2D.Services.getConfig({
          apiKey: apiKey01,
          onSuccess: buildMapFromGeoportal
      });
  });
};

export { initGeoportal };

