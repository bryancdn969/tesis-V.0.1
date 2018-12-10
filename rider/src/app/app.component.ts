import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { StartPage } from '../pages/start/start';
import { TranslateService } from '@ngx-translate/core';
import { USER_PROFILE, USER_STATUS_ACT, DEFAULT_LANGUAGE, USER_STATUS_REGISTERED } from '../services/constants';

import { HomePage } from '../pages/home/home';
import { CheckerPage } from '../pages/checker/checker';
@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {

  rootPage: any;
  nav: any;

  constructor(public translate: TranslateService, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
    this.translate.use(DEFAULT_LANGUAGE);
    platform.ready().then(() => {
      statusBar.styleLightContent();
      splashScreen.hide();
      //localStorage.clear();
      let userProfile = localStorage.getItem(USER_PROFILE);
      console.log("userProfile");
      console.log(userProfile);
      if (userProfile == null || userProfile == undefined || userProfile == "undefined" || userProfile == "null") {
        this.nav.setRoot(StartPage);
        return;
      } else {
        let currentUser = JSON.parse(userProfile);
        console.log("currentUser.status: " + currentUser.status);
        if (currentUser.status == USER_STATUS_ACT) {
          this.nav.setRoot(HomePage);
          return;
        } else if (currentUser.status == USER_STATUS_REGISTERED) {
          this.nav.setRoot(CheckerPage);
          return;
        } else {
          this.nav.setRoot(StartPage);
          return;
        }
      }
   
    });
  }

}

