import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Diagnostic } from '@ionic-native/diagnostic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  message: any;
  constructor(public platform: Platform, private locationAccuracy: LocationAccuracy,
    private alertCtrl: AlertController, private diagnostic: Diagnostic) {

  }
  ionViewWillEnter() {
    let permissing = localStorage.getItem('permissing');
    alert('permissing? ' + permissing);
    if (permissing == 'active') {
      this.verifiLocation();
    }
  }

  ionViewDidLoad() {
    let alert = this.alertCtrl.create({
      title: '¿Estás de acuerdo en que "AntawaGo", acceda a tu ubicación mientras está en uso?',
      message: 'Es importante conocer tu ubicación para que uno de nuestros asociados pase por ti',
      buttons: [
        {
          text: 'No estoy de acuerdo',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            localStorage.setItem('permissing', 'inactive');
          }
        },
        {
          text: 'Estoy de acuerdo',
          handler: () => {
            localStorage.setItem('permissing', 'active');
            this.verifiLocation();
          }
        }
      ]
    });
    alert.present();

  }

  private verifiLocation(): void {
    this.platform.ready().then((readySource) => {

      this.diagnostic.isLocationEnabled().then(
        (isAvailable) => {
          console.log('Is available? ' + isAvailable);
          alert('Is available? ' + isAvailable);
          if (!isAvailable) {
            this.diagnostic.switchToLocationSettings();
          }
        }).catch((e) => {
          console.log(e);
          alert(JSON.stringify(e));
        });


    });
  }
}
