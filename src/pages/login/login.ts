import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

//  rootPage: any = LoginPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToHomePage() {
    console.log('goToHomePage pressed');
//    this.navCtrl.push(HomePage);
    this.navCtrl.setRoot(TabsPage); //This flips it straight to TabsPage
    //and then shows the first tab to the user

  }


}
