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
import { AboutPage } from '../pages/about/about';
import { HelpPage } from '../pages/help/help';
import { MyAccountPage } from '../pages/my-account/my-account';
import { SettingsPage } from '../pages/settings/settings';
import { WelcomePage } from '../pages/welcome/welcome';
import { SignupPage } from '../pages/signup/signup';
import { ConnectivityService } from '../providers/connectivity-service/connectivity-service';
import { RatingComponent } from '../rating/rating.component';
import { MediaCapture } from '@ionic-native/media-capture';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OthersPage,
    PlacesPage,
    SharePage,
    LoginPage,
    TabsPage,
    CompanyDetailsPage,
    AboutPage,
    HelpPage,
    MyAccountPage,
    SettingsPage,
    WelcomePage,
    SignupPage,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
//    HttpModule,
    HttpClientModule
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
    CompanyDetailsPage,
    AboutPage,
    HelpPage,
    MyAccountPage,
    SettingsPage,
    WelcomePage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
//    HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectivityService,
    FileTransfer,
    FileTransferObject,
    File,
    MediaCapture
  ]
})
export class AppModule {}
