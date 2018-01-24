import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CompanyDetailsPage } from '../company-details/company-details';

@Component({
  selector: 'page-others',
  templateUrl: 'others.html'
})
export class OthersPage {
  ratingClicked: number;
  itemIdRatingClicked: number;

  icons: string[];
  items: Array<{id: number, title: string, note: string, rating: number, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 15; i++) {
      var rate = Math.floor(Math.random() * 5) + 1;
//      var ratingStr = '';
//      for(let j=1; j<rate; j++) {
//        ratingStr+="<i class='fa fa-star' aria-hidden='true'></i>";
//      }
//      var ratingOutput = ratingStr;
      this.items.push({
        id: i,
        title: 'Item ' + i,
        note: 'This is item #' + i,
        rating: rate,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  ratingComponentClick(clickObj: any): void {
        console.log('The Item ${clickObj.itemId} has been given ${clickObj.rating} stars, now is time to update the item with the new rating');
  }

  itemTapped(event, item) {
    this.navCtrl.push(CompanyDetailsPage, {
      item: item
    });
  }

}
