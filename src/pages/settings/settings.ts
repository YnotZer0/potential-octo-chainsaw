import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  mediaFile: MediaFile[];
  image: string; // = this.mediaFile['0'].fullPath;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private mediaCapture: MediaCapture) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  takePhoto() {
    let options: CaptureImageOptions = { limit: 1 };

    this.mediaCapture.captureImage(options)
      .then(
        (data: MediaFile[]) => {
          console.log(data);

          this.image = data['0'].fullPath;

        },
        (err: CaptureError) =>
          console.error(err)
      );
  }

}
