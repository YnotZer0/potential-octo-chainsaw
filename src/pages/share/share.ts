import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import 'rxjs/add/operator/map';
//import { MediaCapture, MediaFile, CaptureError, CaptureAudioOptions } from '@ionic-native/media-capture';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage {

  recording: boolean = false;
//  mediaFile: MediaFile[];
  customerReview: string;
  fileToSendName: string;
  fileToSendFullPath: string;
  fileTransfer: FileTransferObject = this.transfer.create();

  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  fileFormat: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
//    private mediaCapture: MediaCapture,
    private http: HttpClient,
    public toastCtrl: ToastController,
    public transfer: FileTransfer,
    public platform: Platform,
    public media: Media,
    public file: File) {
      this.customerReview = "";
      this.fileFormat = "mp3"; //"wav"; //"ogg";
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad SharePage');

  }

  getCompanyName() {
    //speak the company name/brand
    //perform lookup to match and populate dropdown field
  }

  getRating() {
    //speak the rating value
    //either X stars, or X star or X
    //also allow for mapping of:
    // meh, okay, good, (frikin') awesome, the best
  }

  startRecord() {
    if (this.platform.is('android')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.'+this.fileFormat;
      this.filePath = this.file.externalDataDirectory + this.fileName;

      this.fileToSendFullPath = this.file.externalDataDirectory;
      this.fileToSendName = this.fileName;

      this.customerReview += " "+this.filePath;
      //file:///storage/emulated/0/Android/data/com.tony.pigram/files/record112018174541.mp3
      this.audio = this.media.create(this.filePath);
    }
    this.audio.startRecord();
    this.recording = true;
  }
  stopRecord() {
    this.audio.stopRecord();
    this.recording = false;
  }

  callSTT() {
    var watson_url = "https://stream.watsonplatform.net/speech-to-text/api/v1/recognize?model=en-GB_NarrowbandModel&inactivity_timeout=30";
    var watson_token_url = "https://stream.watsonplatform.net/authorization/api/v1/token?url=https://stream.watsonplatform.net/speech-to-text/api";

    var username='ef0dde2a-4d20-4aeb-9fc6-55f71da71524';
    var password='0pq3I5A48o2M';
    var authdata = 'Basic ' + btoa(username + ':' + password);
    console.log(">>> Watson - authdata: ",authdata);
    this.presentToast(authdata);

    //this works from real device BUT not from browser for some reason?!
    this.http.get(watson_token_url,
      {headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method')
          .append('Authorization', authdata)
        , responseType: 'text'
      }
    )
//              .map(res => res.text())
//              .map(res => res.json())
    .subscribe(
      data => {
                //output the RAW info
//                watson_token = data;
//                this.customerReview += " data1="+watson_token
                //data1={"token":"hW2.....H"}
                //output the actual value within "token"
                var w_t_obj = JSON.parse(data);
                this.presentToast(" data11="+w_t_obj.token);
                //data11=Gygt....H

                //this.fileToSendFullPath = "file:///storage/emulated/0/Android/data/com.tony.pigram/files/";
                //this.fileToSendName = "test1.wav";
//                this.fileToSendName = "audio-file.flac"; //this works fine!
                //these values should have been set already
                this.customerReview += " "+this.fileToSendFullPath+this.fileToSendName;

//                var contentType = 'audio/'+this.fileFormat;
                var contentType = 'audio/l16;rate=8000;endianness=big-endian';
//                var contentType = 'audio/mp3 ';//;rate=8000;endianness=big-endian';
                let options: FileUploadOptions = {
                  fileKey: 'file',
                  fileName: this.fileToSendName,
                  mimeType: contentType, //audio/mp3
                  headers: { 'Content-Type': contentType,  //audio/mp3
//                          'Transfer-Encoding': 'chunked',
                          'X-Watson-Authorization-Token': w_t_obj.token,
                          'X-Watson-Learning-Opt-Out': 'true'}
                }
                var sendFile = this.fileToSendFullPath+this.fileToSendName;
                this.fileTransfer.upload(sendFile, watson_url, options)
                .then((data) => {
                  //data = FileUploadResult
                  //.bytesSent: number
                  //.responseCode: number
                  //.response: stringify
                  //headers: {}
                  //success
                  var response = JSON.parse(data.response);
                  var confidence = JSON.stringify(response.results[0].alternatives[0].confidence);
                  var text = JSON.stringify(response.results[0].alternatives[0].transcript);
                  this.customerReview += " ::SUCCESS:: confidence[ "+confidence+" ] text="+text;
                }, (err) => {
                  //error
                  this.customerReview += " ::ERROR::"+JSON.stringify(err);
                  this.presentToast(JSON.stringify(err));
                })

      },
      (err: HttpErrorResponse) => { console.log(err.message);
          this.presentToast(JSON.stringify(err));
          this.customerReview += " err1="+err.message },
      () => console.log('Complete GET')
    );
  }

  getReview() {
    //this invokes the default voice recorder on the phone - not ideal as no control
    this.presentToast("getReview");
//    let options: CaptureAudioOptions = { limit: 1 };
//    this.mediaCapture.captureAudio(options)
//      .then(
//        (data: MediaFile[]) => {
//          console.log(data);
//          this.customerReview = data['0'].name; //Voice 001.m4a
//          this.customerReview += '::'+data['0'].fullPath; //file:///storage/emulated/0/Voice%20Recorder/Voice%20001.m4a
//          this.customerReview += '::'+data['0'].type; //audio/mpeg
//          this.customerReview += '::'+data['0'].size; //75671

//          this.fileToSendName     = data['0'].name;
//          this.fileToSendFullPath = data['0'].fullPath;
//path = base filesystem
//filename = Voice%20001.m4a
//newPath = same as old path
//newFilename = Voice%20001.mp3

//        },
//        (err: CaptureError) => {
//          console.error(err);
//          this.presentToast(JSON.stringify(err));
//        }
//      );
  }

  getTags() {
    //allow user to add TAGS to the review
    //these will have to be validated to remove rude-words
  }

  submitReview() {
    this.presentToast("submitReview");
    //now send the review to the backend for everyone to see
    //in the backend we'll need to have something that tags this as just posted
    //so in the OthersPage it is shown
    //may need to have a tag to indicate the user is interested in this company/brand though
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
