import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
//import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OthersPage } from '../pages/others/others';
import { PlacesPage } from '../pages/places/places';
import { SharePage } from '../pages/share/share';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { CompanyDetailsPage } from '../pages/company-details/company-details';
import { ConnectivityService } from '../providers/connectivity-service/connectivity-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OthersPage,
    PlacesPage,
    SharePage,
    LoginPage,
    TabsPage,
    CompanyDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OthersPage,
    PlacesPage,
    SharePage,
    LoginPage,
    TabsPage,
    CompanyDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
//    HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectivityService
  ]
})
export class AppModule {}
