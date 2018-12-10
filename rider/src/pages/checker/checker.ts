import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UUID, USER_PROFILE, USER_STATUS_ACT, ACTIVATION_CODE } from '../../services/constants';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth-service';
import { ToolsService } from '../../services/tools-service';

@Component({
  selector: 'page-checker',
  templateUrl: 'checker.html',
})
export class CheckerPage {

  values: any = {};

  constructor(public authService: AuthService, public toolsService: ToolsService, public nav: NavController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckerPage');
  }

  valideForm() {
    let code = localStorage.getItem(ACTIVATION_CODE);
    let inputCode = this.values.d1 + this.values.d2 + this.values.d3 + this.values.d4;
    console.log(this.values);
    console.log("inputCode: " + inputCode);
    console.log("code: " + code);
    if (inputCode == code) {
      //updateProfileStatus
      // localStorage.getItem(UUID);
      let userProfile = localStorage.getItem(USER_PROFILE);
      let currentUser = JSON.parse(userProfile);
      currentUser.status = USER_STATUS_ACT;
      console.log(currentUser);
      let promise = this.authService.updateProfileStatus(currentUser);
      Promise.resolve(promise)
        .then((data) => {
          console.log("data");
          console.log(data);
          let result = JSON.parse(JSON.stringify(data));
          if (result.status == 'OK') {
            localStorage.setItem(USER_PROFILE, JSON.stringify(result.response));
            localStorage.setItem(UUID, result.response.user.uuid);
            this.nav.setRoot(HomePage);
          } else {
            
            this.toolsService.showAlert(result.message);
          }
        });

    }else{
      this.toolsService.showAlert("Código no válido.");
    }

  }

  next(el) {
    el.setFocus();
  }
}
