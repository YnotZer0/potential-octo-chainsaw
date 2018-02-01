import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { MediaCapture, MediaFile, CaptureError, CaptureAudioOptions } from '@ionic-native/media-capture';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private mediaCapture: MediaCapture,
    private http: HttpClient,
    public toastCtrl: ToastController,
    public transfer: FileTransfer,
    public file: File) {
      this.customerReview = "";
  }
  mediaFile: MediaFile[];
  customerReview: string;
  fileToSendName: string;
  fileToSendFullPath: string;
  fileTransfer: FileTransferObject = this.transfer.create();

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

  callSTT() {
    //GET a token - You make that request using your Basic Authentication credentials: base64(username:password), which is not the token
    // https://stream.watsonplatform.net/authorization/api/v1/token?url=https://stream.watsonplatform.net/speech-to-text/api
    var watson_url = "https://stream.watsonplatform.net/speech-to-text/api/v1/recognize";
    var watson_token_url = "https://stream.watsonplatform.net/authorization/api/v1/token?url=https://stream.watsonplatform.net/speech-to-text/api";
//    var auth_token_url =  "https://stream.watsonplatform.net/authorization/api/v1/token?watson-token=";
//    var watson_token = "";
    //<token>80XPIu1VEzWFD6hERGJz5T24owjP6B2dRNtMz3w9K5D3GUlaCFguEo7100BxxpcJeUqq6QarPUluQtsXpp0%2BMLFVVAhhUuj91Sw3xLYCOb%2FUZaVrFLvJW%2FJ8t7GVyY5sC%2FlVEEORowB6hsSbizDJVJFfb%2FkNCBQBVd01wyE7W985ArdTErV8lMyfuopJD3rHeAdJ%2BS8faHlI5gAKCgKaxmakGDHkniDjS99BHGAi9BUtXfPZURgzqhWElWvZU3RtMXoJD5mYcXn6F4ska7sJlCEzvNhQQ03W3d4%2BvWd8bhzShJJRAfAYp5NZzn3Apamj7fYiRjf7A3EuPQ1Cl%2BMj9wYImoXdZpeNQZlVGB%2FTvCyUr5GKRdLihwUCD5NfZq44bKB2pt3rGzC%2B5VRArs%2BayT6cvakX96RGPDhBHivTYBm495BToDoIsRpiAV3%2B2RZU%2BucovROV8Usxqmw%2FT5O9OmYYy%2BuWbT%2BiqRn6weXh%2BNCOU%2FN9y7RNPRCb%2FQzKoHIeSxrFtmIVLEuPYyN6ypgrb5I2Bj42a9KFT8jCjttApjbIxHD9%2BUvbNl8q%2F66aQ8lX5Ad0nB%2BhESOXInCnJVjaYOD9ED%2BviiHr4P2BFJkdTdEpJYaiTwXOq0ZvGtc3sRC6Ug9HyduZ56kk4YxxvJ%2FQBeHNNJb0h%2FgcCCqX7lSJrU3gnFtP9JHG%2BYosgkyZdj60azUCT3YftuoDP26UiKFXr7sRm0B%2F1GSUCPSMaUoQndOxIj3ZmQ8eR3pynGyIIsnxs3bOnk4e4hfiPgiu5OAad%2BNwJAKodtFURiL8bMYuMnGcUcELVZwuCrGdYQVzH2fYyFG2E6OH0ix2q51ssDlkgXYrtt%2F2P0mCc2mG7Cgye2QXPhCctJJ%2FE7KohZUHHNp%2FmsBXPjQnQh9XPvoDSw5c3vKRh5DbLmqFojBMZr2GkEaxMbqM1c3WjmWLT%2FH7075yfNJiPIbI2OxZIOKJzuVxhjCTrJKlThzP</token>
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

                this.fileToSendFullPath = "file:///storage/emulated/0/Voice%20Recorder/";
//                this.fileToSendName = "Voice%20002.m4a"; //m4a";
                this.fileToSendName = "audio-file.flac"; //m4a";
//                this.file.readAsBinaryString(this.fileToSendFullPath, this.fileToSendName);
                this.customerReview += " "+this.fileToSendFullPath+this.fileToSendName;
                this.presentToast(this.fileToSendFullPath+this.fileToSendName);

//                this.http.post(URL, file).subscribe(
//                  (r)=>{console.log('got r', r)}
              let options: FileUploadOptions = {
                fileKey: 'file',
                fileName: this.fileToSendName,
                mimeType: 'audio/mp3',
                headers: { 'Content-Type': 'audio/flac',
                        'Authorization': authdata,
                        'X-Watson-Authorization-Token': w_t_obj.token,
                        'X-Watson-Learning-Opt-Out': 'true'}
                }
                var sendFile = this.fileToSendFullPath+this.fileToSendName;
                this.fileTransfer.upload(sendFile, watson_url, options)
                .then((data) => {
                  //success
                  this.customerReview += " ::SUCCESS::"+JSON.stringify(data);
                  this.presentToast(JSON.stringify(data));
                }, (err) => {
                  //error
                  this.customerReview += " ::ERROR::"+JSON.stringify(err);
                  this.presentToast(JSON.stringify(err));
                })

/*
                this.http.post(
                    watson_url,
                    this.file,
                    {headers: new HttpHeaders()
                        .set('Content-Type', 'audio/mp3')
                        .append('X-Watson-Authorization-Token', w_t_obj.token)
                        .append('X-Watson-Learning-Opt-Out', 'true')
                    }
                )
                .subscribe(
                    data => {
                      this.customerReview += " data2="+ data;
                    },
                    (err: HttpErrorResponse) => {
                      this.customerReview += " err2="+err.name+" :: "+err.message;
                    },
                    () => console.log('Complete POST')
                );
*/
      },
      (err: HttpErrorResponse) => { console.log(err.message);
          this.presentToast(JSON.stringify(err));
          this.customerReview += " err1="+err.message },
      () => console.log('Complete GET')
    );
  }

  getReview() {
    let options: CaptureAudioOptions = { limit: 1 };
    this.mediaCapture.captureAudio(options)
      .then(
        (data: MediaFile[]) => {
//          console.log(data);
          this.customerReview = data['0'].name; //Voice 001.m4a
          this.customerReview += '::'+data['0'].fullPath; //file:///storage/emulated/0/Voice%20Recorder/Voice%20001.m4a
          this.customerReview += '::'+data['0'].type; //audio/mpeg
          this.customerReview += '::'+data['0'].size; //75671

          this.fileToSendName     = data['0'].name;
          this.fileToSendFullPath = data['0'].fullPath;
//path = base filesystem
//filename = Voice%20001.m4a
//newPath = same as old path
//newFilename = Voice%20001.mp3

        },
        (err: CaptureError) => {
          console.error(err);
          this.presentToast(JSON.stringify(err));
        }
      );
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
