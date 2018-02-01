import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

//import { Http, Headers, Response, URLSearchParams } from '@angular/http';

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

  goToTabsPage() {
    console.log('goToTabsPage pressed');
    this.navCtrl.setRoot(TabsPage); //This flips it straight to TabsPage
    //and then shows the first tab to the user
  }

/*
  login(username: string, password: string) {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('email', username);
      urlSearchParams.append('password', password);
      let body = urlSearchParams.toString()

      return this.http.post('http://localhost:3000/api/v1/login', body, {headers: headers})
          .map((response: Response) => {
              // login successful if user.status = success in the response
              let user = response.json();
              console.log(user.status)
              if (user && "success" == user.status) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user.data));
              }
          });
  }
*/

}
