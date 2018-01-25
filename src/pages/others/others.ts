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
    this.icons = [
      '',
      'fa fa-university',
      'fa fa-pie-chart',
      'fa fa-pie-chart',
      'fa fa-cutlery',
      'fa fa-wrench',
      'fa fa-battery-half',
      'fa fa-car',
      'fa fa-amazon',
      'fa fa-money',
      'fa fa-rebel',
      'fa fa-superpowers',
      'fa fa-apple',
      'fa fa-shopping-basket',
      'fa fa-fire'
    ];

    this.companies = [
      '',
      'Barclays',
      'Papa Johns',
      'Dominos',
      'Greggs',
      'B&Q',
      'nPower',
      'Valley Gas',
      'Amazon',
      'Virgin Money',
      'Forbidden Planet',
      'Wanhao',
      'Apple',
      'W.H.Smith',
      'Zara'
//      'Allied Irish Banks','Barclays','Deutsche Bank','First Direct','HSBC','Lloyds Bank','Metro Bank','Royal Bank of Scotland','Santander','Smile - Co-operative','Scottish Widows Bank','Standard Chartered Bank','TSB','Virgin Money'
    ]

    this.items = [];
    for(let i = 1; i < 15; i++) {
      var rate = Math.floor(Math.random() * 5) + 1; //random rating for demo
      var reviewCount = Math.floor(Math.random() * 2000) + 1; //random reviews
      this.items.push({
        id: i,
        icon: this.icons[i], //this.icons[Math.floor(Math.random() * this.icons.length)],
        title: this.companies[i],
        note: reviewCount + ' Reviews',
        rating: rate
      });
    }
  }

  //following should never happen as we have a button on the item
  ratingComponentClick(clickObj: any): void {
        console.log('The Item ${clickObj.itemId} has been given ${clickObj.rating} stars, now is time to update the item with the new rating');
  }

  itemTapped(event, item) {
    this.navCtrl.push(CompanyDetailsPage, {
      item: item
    });
  }

}
