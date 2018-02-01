import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-company-details',
  templateUrl: 'company-details.html',
})
export class CompanyDetailsPage {
  selectedItem: any;
  ratingClicked: number;
  itemIdRatingClicked: number;
  reviewers: string[];
  review: string[];
  
  icons: string[];
  reviews: Array<{id: number, name: string, review: string, rating: number, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.reviewers = [
      '',
      'Betty Jane',
      'Frederic Venner',
      'Matt Brooke',
      'Idris Ali',
      'Jess Mulford',
      'Bill Brock',
      'Jack Holland',
      'Caroline Garber',
      'Gary Yelland',
      'Kalen Stockton',
      'Richard Clark',
      'Patrick Cross',
      'Kim Phillips',
      'Zara Birch'
    ]
    this.review = [
      '',
      'Superb, highly recommended',
      'Would use these people again',
      'Coffee was cold',
      'Awesome! Coming back next friday',
      'Joe was EXTRA helpful! Ask for JOE!'
    ]

    this.reviews = [];
    for(let i = 1; i < 15; i++) {
      var rate = Math.floor(Math.random() * 5) + 1; //random rating for demo
      var review = Math.floor(Math.random() * 5) +1; //random review for demo
      this.reviews.push({
        id: i,
        icon: 'fa fa-user',
        name: this.reviewers[i],
        review: this.review[review],
        rating: rate
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyDetailsPage');
  }

}
