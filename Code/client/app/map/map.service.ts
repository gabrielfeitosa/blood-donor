import { Injectable }    from '@angular/core';
import { MapView, Point, SimpleMarkerSymbol, Graphic, Locator, webMercatorUtils } from 'esri-mods';
import { DonorService }     from './../donor/donor.service';
import { Donor }     from './../donor/donor';
import {AppSettings} from './../util/appSettings';

declare var io: any;

@Injectable()
export class MapService {
    locator: Locator = new Locator({
           url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
    });
    
    socket: any;
    view: MapView;
    
    points: any;
    
  constructor(private donorService: DonorService){
    this.points = {};
    
    this.socket = io(AppSettings.ENDPOINT);
    
    this.socket.on("donorCreated", (donor) => {
        this.addDonor(donor);
    });
    
    this.socket.on("donorDeleted", (donor) => {
        this.removeDonor(donor);
    });
    
    this.socket.on("donorUpdated", (donor) => {
        this.addDonor(donor);
    });
  }
    
  watchView(view: MapView){
    this.view = view;
    this.loadData();

     this.view.watch("extent", evt =>{
      this.loadData();
     });
  }
  
  getIdPoint(lat, lon){
    for(let p in this.points){
      let point = this.points[p];
      if(point.geometry.latitude === lat && point.geometry.longitude === lon){
        return p;  
      }
    }
    return null;
  }
  
  locationToAddress(mapPoint){
    return this.locator.locationToAddress(mapPoint);
    
  }
  
  private loadData(){
    
    let extent = webMercatorUtils.webMercatorToGeographic(this.view.extent);
    let query = {
      xmin: extent.xmin, 
      xmax: extent.xmax, 
      ymin: extent.ymin,
      ymax: extent.ymax
    }
    this.donorService.getDonors(query).then(donors =>{
      donors.forEach(donor =>{
        this.addDonor(donor);
      });
    });
  }
  
  private addDonor(donor: Donor){
    let point = this.createGraphicPoint(donor);
    this.view.graphics.add(point);
    this.points[donor._id] = point;
  }
  
  private removeDonor(donor: Donor){
    this.view.graphics.remove(this.points[donor._id]);
    delete this.points[donor._id];
  }
  
  private createGraphicPoint(donor: Donor){
    var point = new Point({
      longitude: donor.coords.lon,
      latitude: donor.coords.lat
    });

    var markerSymbol = new SimpleMarkerSymbol({
      color: [226, 119, 40],
      outline: { 
        color: [255, 255, 255],
        width: 2
      }
    });

    var pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol
    });

    return pointGraphic;
  }
    
}
