import { Component } from '@angular/core';
import { PlacesPage } from '../places/places';
import { OthersPage } from '../others/others';
import { SharePage } from '../share/share';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SharePage;
  tab2Root: any = OthersPage;
  tab3Root: any = PlacesPage;

  constructor() {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
