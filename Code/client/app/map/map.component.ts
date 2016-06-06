import { Component, OnInit }     from '@angular/core';
import { Map, SceneView, MapView, Search, Locator, PopupTemplate, Point, SimpleMarkerSymbol, Graphic} from 'esri-mods';
import { GeolocationService }     from './../util/geolocation.service';
import { MapService }     from './map.service';
import { DonorService }     from './../donor/donor.service';
import { Donor }     from './../donor/donor';

@Component({
    selector: 'map',
    template: `
          <div id="map"></div>
    `,
    styleUrls: ['app/map/map.component.css']
})

export class MapComponent implements OnInit {
    
    donor: Donor;
    
    map: Map = new Map({
        basemap: "streets"
    });

    locator: Locator = new Locator({
           url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
    });

    view:  MapView;
    
    constructor(
        private geolocationService: GeolocationService,
        private donorService: DonorService,
        private mapService: MapService
    ){}
    
    ngOnInit() {

      this.geolocationService.getLocation()
        .then(e => this.createView(e))
        .catch(e => this.createView());
    }    
    
    createView(pos: any){
      
      let position = pos ? [pos.coords.longitude, pos.coords.latitude] : [0,0];
      
      this.view = new MapView({
        center: position,
        container: "map",
        map: this.map,
        zoom: 15,
        extent: {
          spatialReference: {
            wkid: 4326
          }
        }

      });

      let searchWidget = new Search({
        view: this.view
      });

      searchWidget.startup();

      this.view.ui.add(searchWidget, {
        position: "top-left",
        index: 0
      });
      
      this.view.then(() => this.mapService.watchView(this.view));

    }
    
    watchView() {
      this.view.on("click", evt => {
        var lat = Math.round(evt.mapPoint.latitude * 1000) / 1000;
        var lon = Math.round(evt.mapPoint.longitude * 1000) / 1000;
      
        var saveAction = {
          title: "Save",
          id: "save-this"
        };

        var cancelAction = {
          title: "Cancel",
          id: "cancel-this"
        };
      
       var template = new PopupTemplate({
            title: "Donor: [" + lon + ", " + lat + "]",
            location: evt.mapPoint,
            content: '<input [(ngModel)]="donor.name" placeholder="name" />',
            actions: [cancelAction, saveAction]
        });
        
        this.view.popup.open(template);
        
        this.view.popup.on("trigger-action", function(evt) {
          if (evt.action.id === "save-this") {
            
          }
        });
        
        let donor:Donor = new Donor();
        donor.name = "Donor: [" + lon + ", " + lat + "]";
        //this.donorService.save(donor);
        
        // this.locator.locationToAddress(evt.mapPoint)
        //   .then(response => {
        //     this.view.popup.content = response.address.Match_addr;
        //   }).otherwise(() => {
        //     this.view.popup.content= "No address was found for this location";
        //   });
    
      }); 
    }
}
