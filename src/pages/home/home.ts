import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlacesPage } from '../places/places';
import { OthersPage } from '../others/others';
import { SharePage } from '../share/share';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any;
  category: any;
  limit:any;

  constructor(public navCtrl: NavController){
    this.getDefaults();
  }

  goToSharePage() {
    console.log('goToSharePage pressed');
    this.navCtrl.push(SharePage);
  }
  goToOthersPage() {
    console.log('goToOthersPage pressed');
    this.navCtrl.push(OthersPage);
  }
  goToPlacesNearMePage() {
    console.log('goToPlacesNearMePage pressed');
    this.navCtrl.push(PlacesPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  getDefaults(){
    if(localStorage.getItem('category') != null){
      this.category = localStorage.getItem('category');
    } else {
      this.category = 'all';
    }

    if(localStorage.getItem('limit') != null){
      this.limit = localStorage.getItem('limit');
    } else {
      this.limit = 10;
    }
  }

  viewItem(item){
//    this.navCtrl.push(DetailsPage, { //can pass selected item to other page
//      item:item
//    });
  }

  changeCategory(){
//    this.getPosts(this.category, this.limit);
    console.log('selected to change category');
  }


}
