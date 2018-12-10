import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  constructor(public platform: Platform, private androidPermissions: AndroidPermissions, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
    //  this.androidPermissions.requestPermissions(this.androidPermissions.PERMISSION.);
    // this.platform.ready().then(() => {
    //   this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION, this.androidPermissions.PERMISSION.GET_ACCOUNTS]).then(
    //     result => {
    //       console.log('User allowed access to camera');
    //       // put your code here
    //       // alert("Camera Enabled!");
    //     },
    //     err => {
    //       console.error('User denied access to camera!');
    //       //alert("Error Enabled!"); 
    //     }
    //   );
    // });
  }

  goLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

}
