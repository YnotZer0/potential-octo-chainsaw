import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  loginWithFaceBook() {
    this.navCtrl.push(LoginPage);
  }

  loginWithGooglePlus() {
    this.navCtrl.push(LoginPage);
  }

  loginWithTwitter() {
    this.navCtrl.push(LoginPage);
  }

  loginWithEmail() {
    this.navCtrl.push(LoginPage);
  }

  signUpNewUser() {    
    this.navCtrl.push(SignupPage);
  }

}
