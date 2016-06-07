import { Component, OnInit, ViewChild }     from '@angular/core';
import { Map, MapView, Search, PopupTemplate} from 'esri-mods';
import { GeolocationService }     from './../util/geolocation.service';
import { MapService }     from './map.service';
import { DonorService }     from './../donor/donor.service';
import { DonorModalComponent } from './../donor/modal/donor-modal.component';
import { Donor }     from './../donor/donor';

@Component({
    selector: 'map',
    template: `
          <donor-modal #donorModal></donor-modal>
          <div id="map"></div>
    `,
    styleUrls: ['app/map/map.component.css'],
    directives: [DonorModalComponent]
})

export class MapComponent implements OnInit {
    
    @ViewChild('donorModal')
    modal: DonorModalComponent;
    
    donor: Donor;
    
    map: Map = new Map({
        basemap: "streets"
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
        .catch(() => this.createView());
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
      this.listenClickView();
    }
    
    listenClickView() {
      this.view.on("click", evt => {
        let lat = Math.round(evt.mapPoint.latitude * 1000) / 1000;
        let lon = Math.round(evt.mapPoint.longitude * 1000) / 1000;
        
        
        let _id = this.mapService.getIdPoint(lat,lon);
        
        if(!_id){
          this.mapService.locationToAddress(evt.mapPoint)
            .then(loc =>{
              this.modal.newDonor(loc);
            },()=>{
              this.view.popup.open({
                  title: "No donuts for you =(",
                  location: evt.mapPoint,
                  content: 'No address was found for this location'
              });
            });
        }else{
          this.modal.infoDonor(_id);
        }
      }); 
    }
}
