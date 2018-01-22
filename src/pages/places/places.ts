import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
//import { HttpClient } from "@angular/common/http";
import { ConnectivityService } from '../../providers/connectivity-service/connectivity-service';
import { CompanyDetailsPage } from '../company-details/company-details';

declare var google;

@Component({
  selector: 'page-places',
  templateUrl: 'places.html'
})
export class PlacesPage {

  currentPos : any;

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  mapInitialised: boolean = false;
  apiKey: any;
  loader: any;

  constructor(public navCtrl: NavController,
              private geolocation: Geolocation,
              public loadingCtrl: LoadingController,
              public connectivityService: ConnectivityService) {
                this.apiKey = 'AIzaSyASH3LR5-qMalqXFm422NNmwgOlw-GTM0U';
                this.loadGoogleMaps();
  }

  loadGoogleMaps() {
    this.addConnectivityListeners();

    if(typeof google == "undefined" || typeof google.maps == "undefined"){

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if(this.connectivityService.isOnline()){
          console.log("online, loading map");

          //Load the SDK
          window['mapInit'] = () => {
            this.initMap();
            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";

          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);
//if map doesn't show on first page load but does on 2nd time around, put this here as a hack
//          this.initMap();
//          this.enableMap();

        }
      } else {

        if(this.connectivityService.isOnline()){
          console.log("showing map");
          this.initMap();
          this.enableMap();
        }
        else {
          console.log("disabling map");
          this.disableMap();
        }

      }
  }

  initMap(){

    this.mapInitialised = true;

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.addMarker(latLng, this.map, 'you are here');

    });

  }

  disableMap(){
    console.log("disable map");

    this.loader = this.loadingCtrl.create({
      content: "Determining your location...",
      duration: 3000
    });
    this.loader.present();
  }

  enableMap(){
    console.log("enable map");
  }

  addConnectivityListeners(){

    let onOnline = () => {

      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){

          this.loadGoogleMaps();

        } else {

          if(!this.mapInitialised){
            this.initMap();
          }

          this.enableMap();
        }
      }, 2000);

    };

    let onOffline = () => {
      this.disableMap();
    };

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
//above might not work? if not, try the following
//    window.addEventListener('online', onOnline, false);
//    window.addEventListener('offline', onOffline, false);

  }

  showTheMap() {
    console.log('showTheMap:'); //, this.currentPos);
    this.initMap();
    this.enableMap();
  }

  addMarker(position, map, title) {
    return new google.maps.Marker({
//      position: map.getCenter(),
      position: position,
      title: title,
      map,
      animation: google.maps.Animation.DROP,
      infoClick: () => {
        this.navCtrl.push(CompanyDetailsPage);
      }
    });
  }

}
