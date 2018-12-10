import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AuthService } from "../../services/auth-service";
import { ENABLE_SIGNUP, UUID, USER_PROFILE, ACTIVATION_CODE, USER_STATUS_ACT, USER_STATUS_REGISTERED } from "../../services/constants";
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToolsService } from '../../services/tools-service';
import { CheckerPage } from '../checker/checker';
import { HomePage } from '../home/home';
//import { DriverTypePage } from '../driver-type/driver-type';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  userInfo: any = {};
  isRegisterEnabled = ENABLE_SIGNUP;
  authForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  errorMessage: String;

  responseData : any;
  userData = {"email":"admin@crudbooster.com","password":"123456"};

  constructor(public nav: NavController, public authService: AuthService,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    public toast: ToastController, public translate: TranslateService,
    public formBuilder: FormBuilder, public toolsService: ToolsService) {
    localStorage.clear();
    this.authForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  // go to signup page
  signup() {
    this.nav.push(RegisterPage);
  }

  login(value: any){
    this.authService.postFormData(this.userData,"login").then((result) =>{
      this.responseData = result;
      console.log(this.responseData);
      if(this.responseData.api_status == 1 ){
        localStorage.setItem('userData',JSON.stringify(this.responseData));
        this.nav.setRoot(HomePage);
      }
      else{
        //this.presentToast(this.loginErrorString);
      }
    }, (err) => {
      console.log(err);
      //this.common.closeLoading();
    });
  }

  // go to login page
  /*login(value: any) {
    let promise = this.authService.login(value.email, value.password);
    Promise.resolve(promise)
      .then((data) => {
        console.log("data: " + JSON.parse(JSON.stringify(data)).response);
        let profile = JSON.parse(JSON.stringify(data)).response;
        localStorage.setItem(USER_PROFILE, JSON.stringify(profile));
        localStorage.setItem(UUID, profile.user.uuid);
        localStorage.setItem(ACTIVATION_CODE, profile.activationCode);

        console.log("user USER_PROFILE> ", localStorage.getItem(USER_PROFILE));
        console.log("user UUID> ", localStorage.getItem(UUID));
        console.log("user ACTIVATION_CODE> ", localStorage.getItem(ACTIVATION_CODE));
        console.log("user USER_STATUS> ", profile.status);

        if (profile.status == USER_STATUS_ACT) {
          this.nav.setRoot(HomePage);
          return;
        } else if (profile.status == USER_STATUS_REGISTERED) {
          this.nav.setRoot(CheckerPage);
          return;
        }
      });
  }*/

  reset() {
    // if (this.username) {
    //   firebase.auth().sendPasswordResetEmail(this.username)
    //     .then(data =>
    //       this.toast.create({ message: 'Please check your mail', duration: 3000 }).present())
    //     .catch(err => this.toast.create({ message: err.message, duration: 3000 }).present())
    // }
  }

}
